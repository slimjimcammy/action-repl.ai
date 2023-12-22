//
//  ContentView.swift
//  client
//
//  Created by Cameron Yuen on 12/20/23.
//

import SwiftUI
import AVKit

struct ContentView: View {
    var body: some View {
        VStack (alignment: .leading) {
            Text("Action Repl.ai")
                .font(.title)
            HStack {
                Text("Diving clips, never missed.")
                    .font(.subheadline)
                Spacer()
                Text("Yes! Arigato.")
            }
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
