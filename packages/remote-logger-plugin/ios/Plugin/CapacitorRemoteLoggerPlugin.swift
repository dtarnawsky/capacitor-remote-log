import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorRemoteLoggerPlugin)
public class CapacitorRemoteLoggerPlugin: CAPPlugin {
    private let implementation = CapacitorRemoteLogger()

    var host = "";
    var port = 8942;
    
    @objc public func initialize(_ call: CAPPluginCall) {
        guard let hostName = call.getString("hostName") else {
            call.reject("Must provide a hostName")
            return
        }
        guard let portNumber = call.getInt("port") else {
            call.reject("Must provide a port number")
            return
        }
        host = hostName;
        port = portNumber;
        print("initialize \(hostName as Optional) \(portNumber as Optional)");
        call.resolve()
    }
    
    @objc public func write(_ call: CAPPluginCall) {
        guard let message = call.getString("message") else {
            call.reject("Must provide a message2")
            return
        }
        guard let level = call.getString("level") else {
            call.reject("Must provide a level")
            return
        }
        print("write called \(message) \(level) \(host) \(port)")
        let url = URL(string: "http://\(host):\(port)/log")!
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        let bodyData = try? JSONSerialization.data(withJSONObject: call.jsObjectRepresentation, options: [])
        request.httpMethod = "POST"
        request.httpBody = bodyData
        let session = URLSession.shared
        var dataReceived: Data?
        let sem = DispatchSemaphore.init(value: 0)
        let task = session.dataTask(with: request) { (data, response, error) in
            defer { sem.signal() }
            if let error = error {
                print("Error: \(error)")
                return
            }
            dataReceived = data
        }
        
        task.resume()
        sem.wait()
        call.resolve()
    }
}
