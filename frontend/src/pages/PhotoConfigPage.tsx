import { useEffect, useRef } from "react"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { CameraView, useCameraPermissions } from "expo-camera"
import { AppText } from "../ui/app-text"
import { AppButton } from "../ui/app-button"
import { AppBaseContainer } from "../ui/layouts/app-base-container"


export const PhotoConfigPage: React.FunctionComponent = () => {
    const [permission, requestPermission] = useCameraPermissions()
    const cameraRef = useRef<CameraView>(null)

    useEffect(() => {
        if (!permission?.granted)
            requestPermission()
    }, [])

    const takePicture = async () => {
        if (!cameraRef.current)
            return

        const photo = await cameraRef.current.takePictureAsync({
            quality: 0.8,
            base64: false
        })

        console.log(photo.uri)
    }

    return (
        <AppDynamicContainer>
            {!permission &&
                <AppText>Loading...</AppText> 
            }
            {!permission?.granted &&
                <AppButton onClick={requestPermission}>
                    <AppText>Grant Camera Permission...</AppText>
                </AppButton>
            }
            {permission?.granted &&
            <AppDynamicContainer flex vertical gap={8} pBlock={16}>
                <CameraView
                    ref={cameraRef}
                    facing="back"
                    style={{ flex: 1 }}
                />
                <AppBaseContainer flex justify="center">
                    <AppButton onClick={takePicture}>
                        <AppText colorSwap>+</AppText>
                    </AppButton> 
                </AppBaseContainer>
            </AppDynamicContainer>
            }
        </AppDynamicContainer>
    )
}
