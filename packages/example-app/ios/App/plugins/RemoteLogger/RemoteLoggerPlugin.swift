//
//  RemoteLoggerPlugin.swift
//  App
//
//  Created by Damian Tarnawsky on 5/26/22.
//

import Foundation
import Capacitor

@objc(RemoteLoggerPlugin)
public class RemoteLoggerPlugin: CAPPlugin {

  @objc public func initialize(_ call: CAPPluginCall) {
    guard let hostName = call.getString("hostName") else {
          call.reject("Must provide a hostName")
          return
      }
      guard let portNumber = call.getInt("port") else {
          call.reject("Must provide a port number")
          return
      }
      print("initialize \(hostName as Optional) \(portNumber as Optional)");
    call.resolve()
  }

  @objc public func write(_ call: CAPPluginCall) {
    guard let message = call.getObject("message") else {
        call.reject("Must provide a message")
        return
    }
    print("write called \(message)")
    call.resolve()
  }

}
