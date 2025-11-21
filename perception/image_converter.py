from PIL import Image
import sys, os


def convert_image(input_path, output_path, width, height, threshold=128):
    img = Image.open(input_path)
    img = img.resize((width, height), Image.Resampling.LANCZOS)
    img = img.convert("L")

    img = img.point(lambda x: 255 if x > threshold else 0, mode='1')

    img.save(output_path)
    print(f"Saved processed image to {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python convert_bw_resize.py <input.png> <output.png> <width> <height>")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]
    width = int(sys.argv[3])
    height = int(sys.argv[4])

    if not os.path.exists(input_path):
        print("Error: input file does not exist.")
        sys.exit(1)

    convert_image(input_path, output_path, width, height)
