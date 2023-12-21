//
//  ContentView.swift
//  client
//
//  Created by Cameron Yuen on 12/20/23.
//

import SwiftUI
import AVKit

struct ContentView: View {
    @State private var delayInSeconds: Double = 0.0
    @State private var isLive: Bool = true
    @State private var isDragging: Bool = false

    private let maxDelay: Double = 120.0
    private let delayIncrement: Double = 1.0

    var body: some View {
        VStack {
            // Display the camera feed
            CameraPreview(delay: isLive ? 0.0 : delayInSeconds)

            // Delay indicator at the top
            Text("Delay: \(Int(delayInSeconds)) seconds")
                .padding()
                .foregroundColor(.white)
                .background(Color.black.opacity(0.5))
                .offset(y: -20)

            // Gesture for dragging left and right
            Rectangle()
                .frame(height: 300)
                .gesture(
                    DragGesture()
                        .onChanged { value in
                            handleDrag(value: value)
                        }
                        .onEnded { _ in
                            isDragging = false
                        }
                )
                .opacity(isDragging ? 0.5 : 0)
        }
        .onAppear {
            // Set up camera or other initialization if needed
        }
    }

    private func handleDrag(value: DragGesture.Value) {
        let translation = value.translation.width
        let delayChange = Double(translation / 10.0) // Adjust the sensitivity

        if translation > 0 {
            // Dragging right, decrease delay
            if delayInSeconds - delayChange >= 0 {
                delayInSeconds -= delayChange
            } else {
                delayInSeconds = 0.0
            }
        } else {
            // Dragging left, increase delay
            if delayInSeconds + delayChange <= maxDelay {
                delayInSeconds += abs(delayChange)
            } else {
                delayInSeconds = maxDelay
            }
        }

        isLive = delayInSeconds == 0.0
        isDragging = true
    }
}

struct CameraPreview: UIViewControllerRepresentable {
    var delay: Double

    func makeUIViewController(context: Context) -> UIViewController {
        let viewController = UIViewController()

        // Set up AVCaptureSession and AVCaptureVideoPreviewLayer for camera preview
        let session = AVCaptureSession()

        guard let device = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: device),
              session.canAddInput(input) else {
            return viewController
        }

        session.addInput(input)
        session.startRunning()

        let previewLayer = AVCaptureVideoPreviewLayer(session: session)
        previewLayer.frame = viewController.view.layer.bounds
        previewLayer.videoGravity = .resizeAspectFill
        viewController.view.layer.addSublayer(previewLayer)

        // Apply delay if needed
        if delay > 0 {
            DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
                previewLayer.opacity = 0.0
            }
        }

        return viewController
    }

    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
