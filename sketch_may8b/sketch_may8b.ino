
#include <Arduino_JSON.h>

const int numReadings = 10;

//Xsmoothing
int xReadings[numReadings];
int readXIndex = 0;
int xTotal = 0;
int xAverage = 0;


//Joystick
const int X_pin = A1; 

//JoystickPotentiometers
int XValue = 0;

//Joystick Pots Out
int XOut = 0;

//LED Lights
const int LEDpin = 3; //green light

//setup no delay
unsigned long previousMillis = 0;
const long interval = 20;

//create JSON of our serial output
JSONVar serialOutput;

void setup() {
  // initialize serial:
  Serial.begin(9600);

  //LED lights
  pinMode(LEDpin, OUTPUT);

  //initialize all the X readings to 0:
  for (int thisXReading = 0; thisXReading < numReadings; thisXReading++) {
    xReadings[thisXReading] = 0;
  }
  
}

void loop() {
  byte brightness;
  if(Serial.available()){
    brightness = Serial.read();
   analogWrite(LEDpin, brightness);
  }

  //create millis() object
  unsigned long currentMillis = millis();

  //map pot pins from 0 to 255
  XOut = map(xAverage, 0, 1023, 0, 2000);

  //check Millis
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    //subtract last X reading
    xTotal = xTotal - xReadings[readXIndex];
    //read from the sensor:
    xReadings[readXIndex] = analogRead(X_pin);
    //add the reading to the total:
    xTotal = xTotal + xReadings[readXIndex];
    //advance to next position in array:
    readXIndex = readXIndex + 1;

    //if at end of array
    if (readXIndex >= numReadings) {
      //... wrap to beginning
      readXIndex = 0;
    }

    xAverage = xTotal / numReadings;



    //create JSON definitions
    serialOutput["Xaxis"] = XOut;

    //Output JSON values
    Serial.println(serialOutput);
  } 
}

  

