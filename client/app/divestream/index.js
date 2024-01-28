import { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Button,
    Dimensions,
    ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import { Video } from "expo-av";
import { Image } from "expo-image";
import jpeg from "jpeg-js";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";
import * as FileSystem from "expo-file-system";

const TensorCamera = cameraWithTensors(Camera);

function Divestream() {
    const [cameraPermitted, setCameraPermission] = useState(null);
    const [micPermitted, setMicPermission] = useState(null);
    // const [libPermitted, setLibPermitted] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [videoData, setVideoData] = useState();
    const [frames, setFrames] = useState([]);
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const micStatus = await Camera.requestMicrophonePermissionsAsync();
            setCameraPermission(cameraStatus);
            setMicPermission(micStatus);
            await tf.ready();
        })();
    }, []);

    if (cameraPermitted === null || micPermitted === null) {
        return <Text>Awaiting permissions...</Text>;
    } else if (!cameraPermitted) {
        return <Text>Camera not permitted for usage.</Text>;
    }

    const handleCameraStream = (tensors) => {
        const loop = async () => {
            const nextTensor = tensors.next().value;

            const [height, width] = nextTensor.shape;
            const data = new Buffer(
                tf
                    .concat(
                        [nextTensor, tf.ones([height, width, 1]).mul(255)],
                        [-1]
                    )
                    .slice([0], [height, width, 4])
                    .dataSync()
            );

            const rawImageData = { data, width, height };
            const jpegImageData = jpeg.encode(rawImageData, 200);

            const imgBase64 = tf.util.decodeString(
                jpegImageData.data,
                "base64"
            );
            const salt = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
            const uri =
                FileSystem.documentDirectory +
                `tensor-${salt}-${currentFrameIndex}.jpg`;
            await FileSystem.writeAsStringAsync(uri, imgBase64, {
                encoding: FileSystem.EncodingType.Base64,
            });

            setFrames((prevFrames) => [...prevFrames, uri]);

            requestAnimationFrame(loop);
        };

        loop();
    };

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.floor(offsetX / 100); // Assuming each frame is 100 pixels wide
        setCurrentFrameIndex(newIndex);
    };

    const textureDims =
        Platform.OS === "ios"
            ? {
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
              }
            : {
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
              };
    const tensorDims = {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    };

    return (
        <>
            {frames ? (
                <TensorCamera
                    ref={cameraRef}
                    style={{
                        // flex: 0,
                        width: "75%",
                        height: "100%",
                    }}
                    zoom={0}
                    onReady={(tensors) => {
                        handleCameraStream(tensors);
                    }}
                    type={Camera.Constants.Type.front}
                    cameraTextureHeight={200}
                    cameraTextureWidth={200}
                    resizeHeight={200}
                    resizeWidth={200}
                    resizeDepth={3}
                    autorender={true}
                    rotation={90}
                />
            ) : (
                <ScrollView
                    horizontal
                    pagingEnabled
                    onScroll={handleScroll}
                    showsHorizontalScrollIndicator={false}
                >
                    {frames.map((frame, index) => (
                        <Image
                            key={index}
                            source={{ uri: frame.uri }}
                            style={{ width: 100, height: 100 }}
                        />
                    ))}
                </ScrollView>
            )}
        </>

        // <Camera style={styles.container} ref={cameraRef}>
        //     <View style={styles.buttonContainer}>
        //         <Button
        //             title={!isRecording ? "Start Recording" : "End Recording"}
        //             onPress={!isRecording ? recordVideo : stopRecording}
        //         />
        //     </View>
        // </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "bottom",
    },
    buttonContainer: {
        backgroundColor: "#fff",
        alignSelf: "flex-end",
    },
    video: {
        flex: 1,
        alignSelf: "stretch",
    },
});

export default Divestream;
