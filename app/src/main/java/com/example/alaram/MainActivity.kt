package com.example.alaram

import android.app.TimePickerDialog
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import java.util.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Surface(color = MaterialTheme.colors.background) {
                AlarmUi(onSet = { hour, minute ->
                    val cal = Calendar.getInstance().apply {
                        set(Calendar.HOUR_OF_DAY, hour)
                        set(Calendar.MINUTE, minute)
                        set(Calendar.SECOND, 0)
                        if (timeInMillis <= System.currentTimeMillis()) add(Calendar.DAY_OF_YEAR, 1)
                    }
                    AlarmScheduler.scheduleExactAlarm(applicationContext, cal.timeInMillis)
                })
            }
        }
    }
}

@Composable
fun AlarmUi(onSet: (Int, Int) -> Unit) {
    var anim by remember { mutableStateOf(false) }
    val scale by animateFloatAsState(targetValue = if (anim) 1.12f else 1f,
        animationSpec = infiniteRepeatable(tween(800), RepeatMode.Reverse))

    Column(modifier = Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
        Box(modifier = Modifier.size(220.dp), contentAlignment = Alignment.Center) {
            Box(modifier = Modifier
                .fillMaxSize()
                .scale(scale)
                .background(Color(0xFFFE6B8B), CircleShape))
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("Unique Alaram", style = MaterialTheme.typography.h5, color = Color.White)
                Spacer(modifier = Modifier.height(8.dp))
                Button(onClick = { anim = !anim }) { Text(if (anim) "Stop Pulse" else "Start Pulse") }
                Spacer(modifier = Modifier.height(12.dp))
                val ctx = LocalContext.current
                Button(onClick = {
                    val calendar = Calendar.getInstance()
                    TimePickerDialog(ctx, { _, h, m -> onSet(h, m) }, calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE), true).show()
                }) { Text("Set Alarm") }
            }
        }
    }
}
