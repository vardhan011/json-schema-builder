import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SchemaField = ({ nestIndex }) => {
    const { control, register, setValue, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: nestIndex });
    const fieldData = watch(nestIndex) || [];

    return (
        <div className="space-y-4">
            {fields.map((field, index) => {
                const currentPath = `${nestIndex}[${index}]`;
                const type = fieldData[index]?.type;

                return (
                    <div key={field.id} className="border p-4 rounded bg-white shadow-sm space-y-2">
                        <div className="flex flex-wrap gap-4 items-center">
                            <Input
                                {...register(`${currentPath}.key`)}
                                placeholder="Enter key"
                                className="w-full sm:w-1/3"
                            />
                            <Select
                                onValueChange={(value) => setValue(`${currentPath}.type`, value)}
                                defaultValue={fieldData[index]?.type || "string"}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="string">String</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="nested">Nested</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="destructive" type="button" onClick={() => remove(index)}>
                                Delete
                            </Button>
                        </div>
                        {type === "nested" && (
                            <div className="ml-6 mt-3 border-l-2 pl-4 border-gray-300">
                                <SchemaField nestIndex={`${currentPath}.children`} />
                            </div>
                        )}
                    </div>
                );
            })}
            <Button
                type="button"
                className="text-sm"
                onClick={() => append({ key: "", type: "string", children: [] })}
            >
                ➕ Add Field
            </Button>
        </div>
    );
};

export default SchemaField;
