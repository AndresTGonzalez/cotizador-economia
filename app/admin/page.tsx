"use client";
import AdminForm from "@/components/ProductForm";
import Drop from "@/components/dropdown";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Button } from "@nextui-org/react";
import { database } from '@/app/firebase';
import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, getDocs, query, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { EditIcon } from "@/icons/editIcon";
import { DeleteIcon } from "@/icons/deleteIcon";
import TableProducts from "@/components/TableProducts";

export default function AdminPage() {
  return (
    <main className="flex w-screen h-screen items-center justify-center bg-neutral-100">
      <div className="absolute top-4 right-4">
        <Drop />
      </div>
      <div className="w-3/4 h-4/5 bg-white rounded-xl shadow-lg flex flex-row">
        <div className="w-full h-full flex flex-col items-center justify-center rounded-r-xl">
          <TableProducts/>
        </div>
      </div>
    </main>
  );
}
