import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView, Text, Button } from "react-native";
import { Camera } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";

const tensorCamera = cameraWithTensors(Camera);

function Divestream() {
    const [cameraPermitted, setCameraPermission] = useState(null);
    const [micPermitted, setMicPermission] = useState(null);
    // const [libPermitted, setLibPermitted] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [videoData, setVideoData] = useState();
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const micStatus = await Camera.requestMicrophonePermissionsAsync();
            setCameraPermission(cameraStatus);
            setMicPermission(micStatus);
        })();
    }, []);

    if (cameraPermitted === null || micPermitted === null) {
        return <Text>Awaiting permissions...</Text>;
    } else if (!cameraPermitted) {
        return <Text>Camera not permitted for usage.</Text>;
    }

    const recordVideo = () => {
        setIsRecording(true);
        const options = {
            quality: "1080p",
            maxDuration: "60",
            mute: false,
        };
        cameraRef.current.recordAsync(options).then((video) => {
            console.log(video);
            setVideoData(video);
            setIsRecording(false);
        });
    };

    const stopRecording = () => {
        setIsRecording(false);
        cameraRef.current.stopRecording();
    };

    if (videoData) {
        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{ uri: videoData.uri }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                />
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button
                    title={!isRecording ? "Start Recording" : "End Recording"}
                    onPress={!isRecording ? recordVideo : stopRecording}
                />
            </View>
        </Camera>
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
