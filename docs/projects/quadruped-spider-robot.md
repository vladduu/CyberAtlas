---
sidebar_position: 2
title: Quadruped Spider Robot
---

# Quadruped Spider Robot

This page mirrors the main documentation for your embedded Rust project inside CyberAtlas, so the project write-up is available directly on your site.

The project is a quadruped spider robot with 4 legs and 3 degrees of freedom per leg, for a total of 12 servo motors. Each leg has an ankle, knee, and hip joint driven by SG90/MG90S servo motors through a PCA9685 PWM driver. The robot is controlled wirelessly using an HC-05 Bluetooth module and can get up from a lying position, walk forward and backward, and turn left and right.

The firmware runs on an STM32 NUCLEO-F446RE microcontroller written in Rust using the embassy-rs async framework.

## Description

The robot is controlled from the Arduino Bluetooth Control Application. Bluetooth commands are sent from the mobile app to the HC-05 module, forwarded to the MCU over UART, and then translated into leg motion through the PCA9685 over I2C.

## Motivation

The project was motivated by an interest in biomimetic robots and the challenge of coordinating 12 motors in real time on a microcontroller. Building the robot required both hardware integration and software design, especially around gait control and timing.

## Architecture

The system is composed of:

- STM32 NUCLEO-F446RE, the main microcontroller running the Rust and embassy-rs firmware
- PCA9685 PWM driver, which generates PWM signals for all 12 servo motors simultaneously
- HC-05 Bluetooth module, which receives commands from a mobile RC app over UART
- DC-DC Step Down module XL4005, used to regulate the PCA9685 power rail
- DC-DC Step Down module LM2596, used to regulate the microcontroller supply
- 18650 Li-Ion batteries, used to power the circuit

The gait algorithm uses diagonal leg pairs, with one leg moving at a time. Each step follows the same sequence: lift knee, swing hip forward, plant foot, push hip back, and reset. While one leg moves, the opposite hips shift slightly for balance.

### Hardware mapping

| Channel | Servo / Function |
| --- | --- |
| 0 | Right Back Ankle |
| 1 | Right Back Knee |
| 2 | Right Back Hip |
| 3 | Left Back Ankle |
| 4 | Left Back Knee |
| 5 | Left Back Hip |
| 6 | Front Left Ankle |
| 7 | Front Left Knee |
| 8 | Front Left Hip |
| 9 | Front Right Ankle |
| 11 | Front Right Knee |
| 12 | Front Right Hip |
| 13 | Front Right Ankle (remapped, channel 10 damaged) |

## Log

### Week 1 - 3

Bought all the components needed.

### Week 4 - 7

Started building the main frame and installing the servo motors, batteries, and regulators to test the idea and the weight. The first version was built as a prototype.

### Week 8 - 10

The prototype failed because it was too heavy for the construction materials and the SG90 servo motors broke down quickly. The design was rebuilt using 3D printed parts and MG90S metal gear servo motors.

## Hardware

The frame is built using PLA and AMS 3D printed parts together with metal brackets. Twelve MG90S servo motors are mounted across the four legs, three per leg. The servos are controlled by a PCA9685 PWM driver, which is controlled by the STM32 NUCLEO-F446RE over I2C. The HC-05 Bluetooth module connects to the MCU over UART for wireless control.

The servos are powered by a separate supply made from two 18650 rechargeable batteries in series, regulated to 6V using the XL4005 module.

### Photos

![Initial spider position](https://embedded-rust-101.wyliodrin.com/assets/images/initial_position-15666b3b485367f3dd1485ce0d34d5f3.webp)

![Standing position](https://embedded-rust-101.wyliodrin.com/assets/images/standing_position-ad0385efcf8b27da0ff365f050a21254.webp)

![Upside-down spider](https://embedded-rust-101.wyliodrin.com/assets/images/upside_down-6d22245e28453b912d86afc8233ad9e2.webp)

### Schematics

![KiCad schematic](https://embedded-rust-101.wyliodrin.com/assets/images/spider-f3bc80cabbc307334def034e776660b0.svg)

### Bill of materials

| Component | Role | Cost |
| --- | --- | --- |
| STM32 NUCLEO-F446RE | Main microcontroller | 131 RON |
| PCA9685 PWM Driver | 16-channel I2C PWM servo driver | 32 RON |
| MG90S Servo Motor | Leg joints (x12) | 19.33 RON x12 = 232 RON |
| HC-05 Bluetooth Module | Wireless RC control | 46 RON |
| 18650 Batteries | External servo power | 44 RON |
| Building Materials | Robot frame | 100 RON |
| Jumper wires | Connections | 15 RON |
| 18650 Battery Case | Battery series connection | 20 RON |
| DC-DC Step Down module LM2596 | Regulating current to 5V for the MCU | 15 RON |
| DC-DC Step Down module XL4005 | Regulating current to 6V for the servo driver | 15 RON |
| Total |  | 650 RON |

## Software

The firmware uses the following Rust ecosystem crates and embedded components:

| Dependency | Role | Notes |
| --- | --- | --- |
| embassy-executor | Async task executor for Cortex-M | Runs concurrent tasks for gait control and Bluetooth handling |
| embassy-stm32 | STM32 hardware abstraction layer | Provides I2C, UART, and GPIO drivers |
| embassy-time | Time utilities | Handles delays between servo movements |
| embassy-sync | Synchronization primitives | Shares state between async tasks |
| pwm-pca9685 | PCA9685 PWM driver | Controls all 12 servos over I2C |
| cortex-m | Low-level Cortex-M access | Core processor operations |
| cortex-m-rt | Cortex-M runtime | Boot sequence and interrupt routing |
| defmt | Logging framework | Efficient logging for embedded targets |
| defmt-rtt | RTT transport for defmt | Sends logs to the host PC |
| panic-probe | Panic handler | Captures errors and prints them through defmt |

## Links

- [embassy-rs documentation](https://embassy.dev/)
- [STM32 NUCLEO-F446RE datasheet](https://www.st.com/en/evaluation-tools/nucleo-f446re.html)
- [PCA9685 datasheet](https://www.nxp.com/docs/en/data-sheet/PCA9685.pdf)
- [HC-05 Bluetooth module guide](https://components101.com/wireless/hc-05-bluetooth-module)
- [Bluetooth RC Controller app](https://play.google.com/store/apps/details?id=braulio.calle.bluetoothRCcontroller)