package io.ionic.capcitorremotelogger;

import android.util.Log;

public class CapacitorRemoteLogger {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
