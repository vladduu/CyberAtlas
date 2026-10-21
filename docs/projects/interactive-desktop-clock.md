---
sidebar_position: 3
title: Interactive Desktop Clock
description: An Arduino Nano desktop clock with environmental monitoring, proximity-triggered OLED interaction, and automatic display standby.
---

# Interactive Desktop Clock

An interactive desktop clock built around an Arduino Nano, combining a real-time clock, temperature and humidity monitoring, ultrasonic distance measurement, and two displays.

A 16×2 LCD continuously displays the date and time. A separate OLED shows an animated face with blinking eyes. When a change in distance is detected in front of the ultrasonic sensor, the OLED switches to temperature and humidity readings, then returns to the animated face.

After five minutes without detected movement, the OLED turns black while the LCD continues displaying the date and time.

The electronics are assembled on a soldered prototyping board and mounted inside a handmade metal frame.

## Description

The project combines a conventional desktop clock with a small interactive interface.

Instead of displaying all information continuously on one screen, the system separates information into two roles:

- The LCD provides persistent date and time information.
- The OLED provides animation and context-dependent environmental readings.

The HC-SR04 measures the distance to objects in front of the clock. The firmware compares consecutive valid measurements and interprets a sufficiently large change as movement.

A stationary object does not continuously trigger the temperature screen. Moving the object again can trigger another interaction.

The firmware is written in Arduino C++ using Arduino IDE.

## Motivation

The project started as a practical exercise in combining multiple peripherals with an Arduino Nano.

The goal was to build a useful desktop device while learning how to:

- Read and initialize a real-time clock.
- Connect a parallel character LCD.
- Read a digital temperature and humidity sensor.
- Draw graphics and animations on an I²C OLED.
- Use ultrasonic distance measurements for interaction.
- Coordinate several timed behaviors in one program.
- Move from temporary wiring to a soldered assembly.
- Design and assemble a physical frame.

The result is a standalone desktop clock with an animated interface and environmental monitoring.

## Features

- Continuous date display in `DD/MM/YYYY` format.
- Continuous time display in `HH:MM:SS` format.
- DS1302 real-time clock with a backup battery.
- Temperature and humidity readings from a DHT11.
- OLED face with periodically blinking eyes.
- Proximity interaction based on changes in measured distance.
- Environmental readings displayed for 10 seconds after movement.
- Automatic return to the animated face.
- Black OLED standby screen after five minutes without movement.
- Automatic OLED wake-up when movement is detected again.
- Adjustable software temperature offset.
- USB-powered operation.

## Architecture

The Arduino Nano manages all sensors, displays, and application timing.

```text
                    Arduino Nano
                         |
      +------------------+-------------------+
      |                  |                   |
   DS1302 RTC          DHT11              HC-SR04
   Date / time    Temperature / humidity   Distance
      |
      +------------------+-------------------+
                         |
                Display management
                         |
              +----------+----------+
              |                     |
          LCD 16x2              OLED SSD1306
        Date and time        Face / sensor readings
```

### Peripheral interfaces

| Component | Interface | Purpose |
| --- | --- | --- |
| DS1302 | Three-wire serial interface | Date and time |
| LCD 16×2 | 4-bit parallel interface | Persistent clock display |
| DHT11 | Single digital data line | Temperature and humidity |
| SSD1306 OLED | I²C | Animation and sensor readings |
| HC-SR04 | Trigger and echo signals | Distance measurement |

The DS1302 does not use I²C. It communicates through separate `DAT`, `CLK`, and `RST/CE` signals.

The OLED uses the Nano's I²C pins, `A4` and `A5`.

## Hardware

### Main controller

The Arduino Nano runs the firmware and coordinates all peripherals.

The device is powered through the Nano's USB connection.

### Real-time clock

The DS1302 stores the date and time independently of the display update loop.

Its backup battery allows timekeeping to continue when the main USB supply is disconnected. The battery does not power the Nano or the displays.

### LCD

The 16×2 LCD operates in 4-bit parallel mode.

A potentiometer connected to the `VO` input adjusts the display contrast. The LCD remains active when the OLED enters standby.

### OLED

The OLED is configured as a 128×64 SSD1306 display using I²C address `0x3C`.

It displays:

- An animated face during normal operation.
- Temperature and humidity after detected movement.
- A black screen after the inactivity timeout.

### Environmental sensor

The DHT11 provides digital temperature and humidity readings.

The firmware reads it approximately every 2.2 seconds. A software temperature offset of `-2.0°C` is applied to the measured temperature.

This offset compensates for the observed difference from a reference reading. It is not a guarantee of accuracy across all temperatures or installation conditions.

### Ultrasonic sensor

The HC-SR04 measures distance using a trigger pulse and the duration of the returned echo.

Movement detection is implemented in software by comparing distance measurements. It is not a dedicated motion sensor.

### Mechanical construction

The frame is assembled from perforated metal strips, screws, and nuts.

The LCD and OLED are mounted at the front. The ultrasonic sensor is placed above them, facing the interaction area.

The Nano, RTC, temperature sensor, and contrast potentiometer are mounted behind the front panel.

Electrical connections are soldered on a perforated prototyping board, with connectors used for the display and sensor wiring.

## Hardware mapping

### DS1302 RTC

| DS1302 pin | Arduino Nano |
| --- | --- |
| VCC | 5V |
| GND | GND |
| DAT | D6 |
| CLK | D7 |
| RST / CE | D8 |

### LCD 16×2

| LCD pin | Signal | Connection |
| --- | --- | --- |
| 1 | VSS | GND |
| 2 | VDD | 5V |
| 3 | VO | Potentiometer wiper |
| 4 | RS | D12 |
| 5 | RW | GND |
| 6 | E | D11 |
| 7–10 | D0–D3 | Not connected |
| 11 | D4 | D5 |
| 12 | D5 | D4 |
| 13 | D6 | D3 |
| 14 | D7 | D2 |
| 15 | A / LED+ | 5V through backlight current limiting as required |
| 16 | K / LED− | GND |

The two outer terminals of the contrast potentiometer connect to `5V` and `GND`.

### DHT11 module

| DHT11 pin | Arduino Nano |
| --- | --- |
| S / DATA | D13 |
| + / VCC | 5V |
| − / GND | GND |

The final firmware uses `D13` for the DHT11 data signal.

### OLED

| OLED pin | Arduino Nano |
| --- | --- |
| GND | GND |
| VCC | 5V, for the module used in this build |
| SCL | A5 |
| SDA | A4 |

### HC-SR04

| HC-SR04 pin | Arduino Nano |
| --- | --- |
| VCC | 5V |
| GND | GND |
| TRIG | D9 |
| ECHO | D10 |

All modules share a common ground.

## Bill of materials

| Component | Quantity | Role |
| --- | --- | --- |
| Arduino Nano | 1 | Main controller |
| DS1302 RTC module | 1 | Date and time |
| CR2032 battery | 1 | RTC backup power |
| LCD 16×2 | 1 | Persistent clock display |
| Contrast potentiometer | 1 | LCD contrast adjustment |
| SSD1306 I²C OLED | 1 | Animated interface |
| DHT11 module | 1 | Temperature and humidity |
| HC-SR04 | 1 | Ultrasonic distance measurement |
| Perforated prototyping board | 1 | Soldered circuit assembly |
| Wires and connectors | As required | Electrical connections |
| Resistors | As required | Supporting circuitry |
| Perforated metal strips | As required | Frame |
| Screws, nuts, and mounting spacers | As required | Mechanical assembly |
| USB cable | 1 | Power and programming |

Costs are not included because the final component prices were not recorded.

## Photos

### Front view

<img
  src="/img/projects/interactive-clock/front-view.png"
  alt="Front view of the desktop clock with LCD, OLED, and ultrasonic sensor"
  width="900"
/>

### Electronics layout

<img
  src="/img/projects/interactive-clock/top-view.png"
  alt="Electronics layout showing the Arduino Nano, RTC, DHT11, and contrast potentiometer"
  width="900"
/>

### Hand-wired connections

<img
  src="/img/projects/interactive-clock/wiring-view.png"
  alt="Underside of the prototyping board showing soldered wire connections"
  width="900"
/>

## Software

### Dependencies

| Library | Purpose |
| --- | --- |
| Wire | I²C communication with the OLED |
| ThreeWire | Three-wire communication with the DS1302 |
| Rtc by Makuna | DS1302 date and time access |
| LiquidCrystal | Parallel LCD control |
| DHT sensor library by Adafruit | DHT11 measurements |
| Adafruit Unified Sensor | Dependency used by the DHT library |
| Adafruit GFX Library | Graphics and text drawing |
| Adafruit SSD1306 | OLED initialization and display control |

### Timing

Most application behavior is scheduled using `millis()`.

| Task | Interval / duration |
| --- | --- |
| LCD update | 250 ms |
| DHT11 measurement | 2,200 ms |
| Ultrasonic measurement, OLED active | 120 ms |
| Ultrasonic measurement, OLED in standby | 500 ms |
| Eyes open | 3,000 ms |
| Eyes closed | 180 ms |
| Environmental screen | 10,000 ms after the latest detected movement |
| OLED inactivity timeout | 300,000 ms |

The program avoids long delays during normal operation, but it is not fully non-blocking. Ultrasonic echo measurement uses `pulseIn()` with a 30 ms timeout, and sensor/display operations also take execution time.

### OLED states

The interface has three logical states:

| State | Display content | Transition |
| --- | --- | --- |
| Face | Blinking eyes | Movement opens the environmental screen |
| Environmental readings | Temperature and humidity | Returns to the face after 10 seconds without another trigger |
| Standby | Black screen | Movement wakes the OLED and opens environmental readings |

Each detected movement restarts both the environmental display timer and the inactivity timer.

A stationary object does not reset the inactivity timer.

### Movement detection

The current configuration uses:

```cpp
const int MOVEMENT_THRESHOLD_CM = 5;
const int MIN_DISTANCE_CM = 3;
const int MAX_DISTANCE_CM = 250;
```

The firmware:

1. Takes a distance measurement.
2. Rejects invalid or out-of-range readings.
3. Uses the first valid reading as a reference.
4. Compares each subsequent valid reading with the previous valid reading.
5. Triggers an interaction when the difference reaches at least 5 cm.

This detects changes in distance, not all possible movement. An object moving sideways at a similar distance may not trigger the interface.

Because the reference is updated after each valid sample, very slow movement can also go undetected when each individual change stays below the threshold.

### OLED standby

After five minutes without detected movement, the firmware clears the screen and sends:

```cpp
display.ssd1306_command(SSD1306_DISPLAYOFF);
```

To wake the display, it sends:

```cpp
display.ssd1306_command(SSD1306_DISPLAYON);
```

Only the OLED panel is turned off. The Arduino remains active, the LCD continues updating, and the ultrasonic sensor continues taking measurements.

The project does not put the Nano into hardware deep sleep.

### RTC initialization

The RTC time is set using:

```cpp
Rtc.SetDateTime(RtcDateTime(__DATE__, __TIME__));
```

This instruction is used temporarily during setup and then commented out.

Leaving it active resets the RTC to the sketch compilation time whenever the Nano restarts.

Normal operation only reads the RTC; it does not continuously synchronize it with a PC or an internet time server.

## Development log

### Initial clock prototype

The first version combined the Nano, DS1302, and LCD to display the date and time.

This stage involved identifying the correct RTC interface and configuring the Nano upload settings.

### Environmental monitoring

A DHT11 was added for temperature and humidity.

An early test incorrectly treated the sensor as an analog device. Identifying it as a digital DHT11 resolved the incorrect temperature conversion.

### OLED interface

An SSD1306 OLED was added for a blinking-eye animation.

The LCD remained dedicated to date and time information.

### Ultrasonic interaction

The HC-SR04 was integrated to switch the OLED to environmental readings when a change in distance was detected.

The display returns to the face after the interaction timeout.

### Soldered assembly and frame

The circuit was assembled on a perforated prototyping board.

The displays and sensors were mounted in a handmade metal frame to create a desktop device.

### Inactivity handling

An OLED standby mode was added to turn the screen black after five minutes without detected movement.

The clock display remains active throughout standby.

## Testing and observations

### Temperature offset

The DHT11 initially displayed approximately 2°C above the reference room temperature.

A `-2.0°C` software offset was added. Sensor placement and heat from nearby electronics remain relevant to the final reading.

### RTC timekeeping

Timekeeping discrepancies were observed during development.

The firmware must not repeatedly overwrite the RTC with a fixed initialization time. Continued drift after correct initialization requires separate investigation; the current design does not include automatic clock synchronization.

### Interaction behavior

A moving object can trigger the environmental screen repeatedly.

If movement continues, the 10-second timer restarts, so the environmental screen can remain visible for longer than 10 seconds overall.

### No-echo behavior

The current implementation ignores invalid measurements.

Entering the sensor's range does not always trigger immediately if there is no previous valid reference or if the new distance is close to an older reference.

## Limitations

- No Wi-Fi or cloud connection is implemented in the current Nano build.
- No remote dashboard is part of the current firmware.
- Motion detection is based only on changes in measured distance.
- Consecutive-sample comparison can miss slow movement.
- DHT11 readings are intended for basic environmental monitoring.
- The temperature offset is an installation-specific correction.
- RTC accuracy depends on the module and its operating conditions.
- The open frame leaves wiring and electronics exposed.
- Turning off the OLED does not turn off the rest of the device.

## Future improvements

- Add a Flutter Web dashboard with Firebase Authentication.
- Store environmental readings in Firebase for historical graphs.
- Use a Python program on a PC or Raspberry Pi to receive Nano data over USB.
- Add timestamps and stale-data indicators to the dashboard.
- Integrate Gemini API through the PC or Raspberry Pi.
- Improve motion detection using filtering and a stable distance reference.
- Add a time-setting interface or automatic synchronization through a gateway.
- Design a custom PCB to replace the hand-wired prototyping board.
- Improve sensor placement and thermal isolation.
- Add a protective enclosure while preserving ventilation.