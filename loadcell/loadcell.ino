#include "HX711.h"
#include <ESP8266WiFi.h>
#include <String.h>
#include <LiquidCrystal_I2C.h>
#include <PubSubClient.h>

#define wifi_ssid  "204deptrai"
#define wifi_password  "dinhnhatptit"
#define mqtt_server "broker.mqttdashboard.com"
#define mqtt_user "thuy"
#define mqtt_password "123456"
#define topic  "sensorData1234"

LiquidCrystal_I2C lcd(0x27, 16, 2); // Địa chỉ I2C của màn hình LCD

#define LOADCELL_DOUT_PIN  2
#define LOADCELL_SCK_PIN   14

HX711 LOADCELL_HX711;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  lcd.begin();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Weight:");

  Serial.println("Setup...");
  delay(1000);

  Serial.println();
  Serial.println("LOADCELL_HX711 begin.");
  LOADCELL_HX711.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  
  delay(1000);

  Serial.println();
  if (LOADCELL_HX711.is_ready()) {
    Serial.println("Do not place any object or weight on the scale.");
    Serial.println("Please wait...");
    for (int i = 5; i > 0; i--) {
      Serial.println(i);
      delay(1000);
    }
    
    LOADCELL_HX711.set_scale(108.057);    
    Serial.println();
    Serial.println("Set the scales...");
    Serial.println("Please wait...");
    delay(1000);
    
    LOADCELL_HX711.tare();  //--> Reset scale to 0.
    Serial.println();
    Serial.println("Please place objects or weights on the scales.");
    for (int i = 5; i > 0; i--) {
      Serial.println(i);
      delay(1000);
    }
  } else {
    Serial.println("HX711 not found.");
  }

  Serial.println();
  Serial.println("Setup finish.");
  delay(1000);

  Serial.println();
  connectToWiFi();
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long weight = LOADCELL_HX711.get_units(10); // Sử dụng hàm get_units() để đọc giá trị cân nặng
  Serial.println("Weight: " + String(weight) + " g");

  lcd.setCursor(0, 0);
  lcd.print("                "); // Xoá dữ liệu cũ
  lcd.setCursor(0, 0);
  lcd.print("Weight: " + String(weight) + "g");

  if (client.publish(topic, String(weight).c_str())) {
    Serial.println("Published to MQTT: " + String(weight));
  } else {
    Serial.println("Failed to publish to MQTT");
  }

  delay(2000); // Đợi 1 giây trước khi đọc lại trọng lượng
}


void connectToWiFi() {
  Serial.println("Connecting to WiFi");
  WiFi.begin(wifi_ssid, wifi_password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println(".");
  }
  Serial.println("");
  Serial.println("Connected to WiFi");
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    String clientName = "thuy";
    if (client.connect(clientName.c_str(), mqtt_user, mqtt_password)) {
      Serial.println("Connected to MQTT");
    } else {
      Serial.print("Failed with state ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}
