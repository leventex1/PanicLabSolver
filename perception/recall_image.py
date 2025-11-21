from hoppfield_network import HopfieldNetwork
from PIL import Image
import numpy as np
import sys, os


def load_binary_image(path):
    img = Image.open(path)
    img = img.convert("L")
    img = img.point(lambda x: 255 if x > 128 else 0, mode='L')

    # Convert image to np vector of +1 / -1
    arr = np.array(img).astype(np.uint8)
    arr = np.where(arr == 255, 1, -1)  # 1 or -1

    return arr.flatten(), img

def save_pattern_as_image(vector, width, height, output_path):
    arr = np.where(vector.reshape(height, width) == 1, 255, 0).astype(np.uint8)
    img = Image.fromarray(arr, mode='L')
    img.save(output_path)
    print(f"Recalled image saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage:")
        print("python recall_image.py <size> <output.png> <recall.png> <image1> [image2] ...")
        sys.exit(1)

    size = int(sys.argv[1])
    output_path = sys.argv[2]
    recall_path = sys.argv[3]

    image_paths = sys.argv[4:]
    patterns = []

    print("Loading images...")
    for path in image_paths:
        if not os.path.exists(path):
            print(f"Error: image not found: {path}")
            sys.exit(1)

        vec, _ = load_binary_image(path) 
        patterns.append(vec)


    print(f"Training Hopfield Network on {len(patterns)} patterns...")
    count = size * size
    hopfield = HopfieldNetwork(count)
    hopfield.train(np.array(patterns))

    print("Recalling pattern...")
    test_vec, _ = load_binary_image(recall_path)
    output_vector = hopfield.recall(test_vec, 10)

    save_pattern_as_image(output_vector, size, size, output_path)
