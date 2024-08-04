"use client";

import { Bird, CornerDownLeft, Paperclip, Rabbit, Turtle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import Image from "next/image";

const tomatoPlantDiseases = {
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

export default function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [image, setImage] = React.useState<File | null>(null);
  const [prediction, setPrediction] = React.useState<{
    class: string;
    confidence: string;
  } | null>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(
      "https://tomato-disease-cnn-5f092777a81e.herokuapp.com/predict",
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
      // Open drawer on mobile
      if (window.innerWidth < 768) {
        setIsDrawerOpen(true);
      }
    }
  };

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            Tomato Disease Classification
          </h1>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Prediction</DrawerTitle>
                <DrawerDescription>
                  The predicted tomato disease will be shown here.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Prediction
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Disease</Label>
                    <Input
                      id="model"
                      type="text"
                      value={prediction?.class}
                      readOnly
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Confidence</Label>
                    <Input
                      id="temperature"
                      type="text"
                      value={
                        prediction?.confidence
                          ? (parseFloat(prediction.confidence) * 100).toFixed(
                              2
                            ) + "%"
                          : ""
                      }
                      readOnly
                    />
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Causes
                  </legend>
                  <div className="grid gap-3">
                    <Textarea
                      id="model"
                      className="min-h-40 resize-none"
                      value={
                        prediction?.class
                          ? (tomatoPlantDiseases as any)[prediction?.class]
                              .causes
                          : ""
                      }
                      readOnly
                    />
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Treatments
                  </legend>
                  <div className="grid gap-3">
                    <Textarea
                      id="model"
                      className="min-h-40 resize-none"
                      value={
                        prediction?.class
                          ? (tomatoPlantDiseases as any)[prediction?.class]
                              .treatments
                          : ""
                      }
                      readOnly
                    />
                  </div>
                </fieldset>
              </div>
            </DrawerContent>
          </Drawer>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <div className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Prediction
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Disease</Label>
                  <Input
                    id="model"
                    type="text"
                    value={prediction?.class}
                    readOnly
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">Confidence</Label>
                  <Input
                    id="temperature"
                    type="text"
                    value={
                      prediction?.confidence
                        ? (parseFloat(prediction.confidence) * 100).toFixed(2) +
                          "%"
                        : ""
                    }
                    readOnly
                  />
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Causes
                </legend>
                <div className="grid gap-3">
                  <Textarea
                    id="model"
                    className="min-h-40 resize-none"
                    value={
                      prediction?.class
                        ? (tomatoPlantDiseases as any)[prediction?.class].causes
                        : ""
                    }
                    readOnly
                  />
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Treatments
                </legend>
                <div className="grid gap-3">
                  <Textarea
                    id="model"
                    className="min-h-40 resize-none"
                    value={
                      prediction?.class
                        ? (tomatoPlantDiseases as any)[prediction?.class]
                            .treatments
                        : ""
                    }
                    readOnly
                  />
                </div>
              </fieldset>
            </div>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Preview
            </Badge>
            {image ? (
              <div className="flex-1 p-8 flex items-center justify-center">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Tomato disease"
                  className="object-contain h-full w-auto rounded-lg"
                  width={0}
                  height={0}
                  sizes="auto"
                />
              </div>
            ) : (
              <div className="flex-1" />
            )}
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
              onSubmit={handleSubmit}
            >
              <div className="flex p-4 pb-1 justify-center">
                <Paperclip className="size-4 mt-2 ml-2 -mr-5" />
                <Input
                  type="file"
                  className="min-h-12 resize-none border-0 shadow-none focus-visible:ring-0 z-10 cursor-pointer pl-6"
                  onChange={(e) => setImage(e.target?.files?.[0] ?? null)}
                />
              </div>
              <div className="flex items-center p-3 pt-0 z-20">
                <Button
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5 z-20"
                >
                  Predict Disease
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
