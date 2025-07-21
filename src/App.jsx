import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import SchemaField from "./SchemaField";
import { Button } from "@/components/ui/button";

function App() {
  const methods = useForm({ defaultValues: { fields: [] } });
  const [liveJSON, setLiveJSON] = useState({});

  const generateJSON = (fields) => {
    const result = {};
    fields.forEach((f) => {
      if (!f.key) return;
      if (f.type === "nested") {
        result[f.key] = generateJSON(f.children || []);
      } else {
        result[f.key] = f.type;
      }
    });
    return result;
  };

  useEffect(() => {
    const subscription = methods.watch((value) => {
      const json = generateJSON(value.fields || []);
      setLiveJSON(json);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const onSubmit = (data) => {
    console.log("Submitted Schema:", data);
  };

  return (
    <FormProvider {...methods}>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">🧩 JSON Schema Builder</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <SchemaField nestIndex="fields" />
          <Button type="submit">Submit</Button>
        </form>
        <div className="mt-6 p-4 bg-gray-100 rounded border">
          <h2 className="text-lg font-semibold mb-2">Live JSON Preview</h2>
          <pre className="bg-white p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(liveJSON, null, 2)}
          </pre>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
