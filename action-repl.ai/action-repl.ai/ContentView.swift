import SwiftUI
import AVKit

struct ContentView: View {
    @State private var isLive: Bool = true

    var body: some View {
        VStack {
            // Display the camera feed
            CameraPreview()

             // Gesture for dragging left and right
        }
        .onAppear {
            // Set up camera or other initialization if needed
        }
    }
}

struct CameraPreview: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        let viewController = UIViewController()

        DispatchQueue.global(qos: .background).async {
            // Set up AVCaptureSession and AVCaptureVideoPreviewLayer for camera preview
            let session = AVCaptureSession()

            guard let device = AVCaptureDevice.default(for: .video),
                  let input = try? AVCaptureDeviceInput(device: device),
                  session.canAddInput(input) else {
                return
            }

            session.addInput(input)
            session.startRunning()

            DispatchQueue.main.async {
                let previewLayer = AVCaptureVideoPreviewLayer(session: session)
                previewLayer.frame = viewController.view.layer.bounds
                previewLayer.videoGravity = .resizeAspectFill
                viewController.view.layer.addSublayer(previewLayer)
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
