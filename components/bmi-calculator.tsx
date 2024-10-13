"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";

// Import custom UI components from the UI directory
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the BMI result
interface BmiResult {
  bmi: string;
  category: string;
}

// Default export of the BmiCalculator function
export default function BmiCalculator() {
  // State hooks for managing height, weight, BMI result, and error message
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");

  // Handler for updating height state on input change
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };

  // Handler for updating weight state on input change
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  // Function to calculate the BMI and determine the category
  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight."); // Alert if either input is empty
      return;
    }

    const heightInMeters = parseFloat(height) / 100 ;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number."); // Alert if height is not positive
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number."); // Alert if weight is not positive
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters); // Calculate the BMI value
    let category = "";

    if (bmiValue < 18.5) {
      category = "You are Underweight😲"; // Set category based on BMI value
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "You are Normal😎";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "You are Overweight😐";
    } else {
      category = "You are Obese☹️"
    }

    setResult({ bmi: bmiValue.toFixed(2), category }); // Set the BMI result state
    setError(""); // Clear any previous error message
  };

  // JSX return statement rendering the BMI calculator UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      {/* Center the BMI calculator card within the screen */}
      <Card className="w-full max-w-md mx-auto bg-blue-300">
        <CardHeader>
          {/* Header with title and description */}
          <CardTitle className="text-center font-bold text-5xl">BMI Calculator</CardTitle>
          <CardDescription className="text-center font-mono bg-gray-600 p-1 text-white">
            <b>Enter your height and weight to calculate your BMI</b>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 mt-4">
          {/* Input for height */}
          <div className="gap-2 flex text-center">
            <Label htmlFor="height" className="text-base font-bold">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height ?? ""}
              onChange={handleHeightChange}
              className="bg-slate-400 font-bold text-white w-24"
            />
          
          {/* Input for weight */}
          
            <Label htmlFor="weight" className="text-base font-bold">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight ?? ""}
              onChange={handleWeightChange}
              className="bg-slate-400 font-bold text-white w-24"
            />
          </div>
          {/* Button to calculate BMI */}
          <div className="text-center">
          <Button onClick={calculateBmi} className="w-32 bg-blue-600 text-black font-bold hover:text-yellow-400 hover:bg-green-600">Calculate</Button>
          </div>
          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center font-bold text-base">{error}</div>}
          {/* Display BMI result if available */}
          {result && (
            <div className="grid gap-2">
              <div className="text-center text-4xl font-bold text-gray-800">{result.bmi}</div>
              <div className="text-center text-muted-foreground text-xl font-bold text-teal-700">
                {result.category}
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 text-center bg-gray-200">
        <p className="text-xs"><u>How to convert your height in centimeters</u><br />
              <b>For Example</b>
              <br />
              if your height is 5 feet and 4 inch so we convert feet to in inches<br />
              <b>5 feet * 12 = 60</b><br />
              (now 5 feet is convert 60 inches)<br />
              <b>60 inches + 4 inches = 64 inches</b>
              <br />
              Now convert inches into Centimeters:
              <br />
              <b>64 inches * 2.54 = 162.56</b>
            </p>
        </div>
        <div>
          <p className="text-center p-2 text-xs">Made by <b>MARYAM ANSARI</b></p>
        </div>
      </Card>
    </div>
  );
}
