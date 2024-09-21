import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useRef, useMemo, useCallback, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { G, Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

interface Prediction {
  class: string;
  confidence: string;
}

const tomatoPlantDiseases: Record<
  string,
  { causes: string; treatments: string }
> = {
  Bacterial_spot: {
    causes:
      "Bacteria from the Xanthomonas genus (X. vesicatoria, X. euvesicatoria, X. gardneri, X. perforans).\n\nFavored by high temperatures (75°F to 86°F), high humidity, and frequent rainfall/overhead irrigation.",
    treatments:
      "Use certified disease-free seeds and disease-free transplants.\n\nImplement crop rotation and avoid planting tomatoes or peppers in the same soil for at least 3-4 years.",
  },
  Healthy: {
    causes: "No disease detected.",
    treatments:
      "Maintain general good practices including proper spacing, watering, and fertilization.",
  },
  Septoria_leaf_spot: {
    causes:
      "Caused by the fungus Septoria lycopersici.\n\nFavors wet, humid conditions and spreads through water splashes from rain or irrigation.",
    treatments:
      "Remove and destroy affected leaves to reduce the spread of the fungus.\n\nUse fungicides like chlorothalonil or mancozeb as a preventive measure.\n\nEnsure good air circulation by proper spacing of plants and staking.",
  },
  Spider_mites_Two_spotted_spider_mite: {
    causes:
      "Caused by Tetranychus urticae, which thrives in hot, dry conditions.",
    treatments:
      "Regularly spray plants with water to keep humidity high and dislodge mites.\n\nUse miticides or insecticidal soaps specifically labeled for spider mites.\n\nIntroduce natural predators like ladybugs or predatory mites.",
  },
  YellowLeaf__Curl_Virus: {
    causes:
      "Transmitted by the whitefly (Bemisia tabaci).\n\nFavored by warm weather and high whitefly populations.",
    treatments:
      "Use whitefly-resistant tomato varieties.\n\nControl whitefly populations with insecticidal soaps, neem oil, or yellow sticky traps.\n\nRemove and destroy infected plants to prevent the spread of the virus.",
  },
};

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "75%"], []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);

    const formData: any = new FormData();
    formData.append("file", {
      uri: image,
      name: "image.jpg",
      type: "image/jpeg",
    });

    const response = await fetch(
      "https://agri-cnn-081a2876da3f.herokuapp.com/predict",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setPrediction(data);
      handlePresentModalPress();
    }
    setLoading(false);
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Tomato Disease Classification</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.previewBadge}>
          <Text style={styles.previewBadgeText}>Preview</Text>
        </View>
        {image ? (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: image }}
              transition={1000}
            />
          </View>
        ) : (
          <View style={styles.emptyImageContainer} />
        )}
        <View style={styles.formContainer}>
          <TouchableOpacity
            onPress={handleImagePick}
            style={styles.imagePicker}
          >
            <Svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              id="paper-clip-bottom-right-2"
              data-name="Flat Line"
            >
              <Path
                id="primary"
                d="M5.23,15.27l3.95,3.95a6.1,6.1,0,0,0,8.61,0h0a6.09,6.09,0,0,0,0-8.6L11.36,4.19a4,4,0,0,0-5.74,0h0a4.06,4.06,0,0,0,0,5.73l6.74,6.74a2,2,0,0,0,2.87,0h0a2,2,0,0,0,0-2.87l-7-7"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              ></Path>
            </Svg>
            <Text style={styles.imagePickerText}>Pick an image</Text>
          </TouchableOpacity>
          {loading ? (
            <View style={[styles.submitButton, styles.loadingButton]}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Predict Disease</Text>
              <Svg width="22px" height="22px" viewBox="0 0 24 24" fill="none">
                <G stroke="#fff" strokeLinecap="round" strokeWidth="2">
                  <Path d="M20 5v6.5a3 3 0 01-3 3H5" />
                  <Path d="M7.5 18L4 14.5 7.5 11" />
                </G>
              </Svg>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
      >
        <BottomSheetView style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Prediction</Text>
            <Text style={styles.modalSubTitle}>
              The predicted tomato disease will be shown here.
            </Text>
            <View style={styles.fieldset}>
              <Text style={styles.legend}>Disease</Text>
              <Text style={styles.input}>{prediction?.class}</Text>
            </View>
            <View style={styles.fieldset}>
              <Text style={styles.legend}>Confidence</Text>
              <Text style={styles.input}>
                {prediction?.confidence
                  ? (parseFloat(prediction.confidence) * 100).toFixed(2) + "%"
                  : ""}
              </Text>
            </View>
            <View style={styles.fieldset}>
              <Text style={styles.legend}>Causes</Text>
              <Text style={styles.textarea}>
                {prediction?.class
                  ? tomatoPlantDiseases[prediction?.class]?.causes
                  : ""}
              </Text>
            </View>
            <View style={styles.fieldset}>
              <Text style={styles.legend}>Treatments</Text>
              <Text style={styles.textarea}>
                {prediction?.class
                  ? tomatoPlantDiseases[prediction?.class]?.treatments
                  : ""}
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    borderBottomWidth: 0.4,
    borderBottomColor: "hsl(222.2 84% 4.9%)",
    padding: 15,
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    margin: 16,
    marginBottom: 0,
    flex: 1,
    flexDirection: "column",
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  previewBadge: {
    position: "absolute",
    right: 12,
    top: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
  },
  previewBadgeText: {
    fontSize: 12,
    color: "#000",
  },
  imageContainer: {
    flex: 1,
    marginTop: 16,
    padding: 20,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
    borderRadius: 8,
  },
  emptyImageContainer: {
    flex: 1,
  },
  formContainer: {
    height: 110,
    overflow: "hidden",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 16,
    gap: 20,
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  imagePickerText: {
    color: "hsl(229.2 17.4% 17.2%)",
  },
  submitButton: {
    width: "55%",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "hsl(229.2 17.4% 17.2%)",
    padding: 8,
    borderRadius: 8,
  },
  loadingButton: {
    width: 50,
    opacity: 0.8,
  },
  submitButtonText: {
    color: "#fff",
  },
  modalView: {
    flex: 1,
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalSubTitle: {
    fontSize: 14,
    marginBottom: 22,
    color: "hsl(215.4 16.3% 46.9%)",
  },
  fieldset: {
    marginBottom: 16,
  },
  legend: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    padding: 9,
    borderRadius: 6,
    borderColor: "hsl(215.4 16.3% 76.9%)",
    borderWidth: 0.5,
  },
  textarea: {
    padding: 9,
    borderRadius: 8,
    borderColor: "hsl(215.4 16.3% 76.9%)",
    borderWidth: 0.5,
    minHeight: 90,
  },
});
