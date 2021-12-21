# Alexa-Timer
Alexa Timer

Main part of this is in Node red. See Node-Red.txt for file
![image](https://user-images.githubusercontent.com/14929601/146995888-a1fc647c-d88b-4737-91ca-b22a744e3aa6.png)

This sends the timer info to HomeAssistant via MQTT. The below senors are needed.
````
- platform: mqtt
  name: "alexatimername"
  state_topic: "alexa/timer/kitchen_next_timer_name"
  
- platform: template
  sensors:
    alexatimertime: 
      value_template: "{{ (as_timestamp( states.sensor.kitchen_next_timer.state))|timestamp_custom('%Y-%m-%d.%H:%M:%S') }}"

- platform: mqtt
  name: "alexatimerct"
  state_topic: "alexa/timer/alexatimerct"
  
- platform: template
  sensors:
    alexatimermessage66:
      value_template: "http://192.168.0.110:8090/syslog?type=INFO&message=TimeChange.{{states('sensor.alexatimername')}}.{{states('sensor.alexatimertime')}}.{{states('sensor.alexatimerct')}}&silent=true"
````
MMM-AlexaTimer is a module for Magic Mirror, modified slightly for this.

The alexatimermessage66 sends the info to the magic mirror to display the time. Change the IP address of 192.168.0.110:8090 to your mirror.

