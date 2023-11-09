"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { database } from '@/app/firebase';
import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { BiSolidChevronsDown } from "react-icons/bi";
type Product = {
    id: string,
    name: string,
    description: string,
    percent: number,
    image: string
}

export default function TableProducts() {
    const [products, setProducts] = useState<Array<Product>>([]);
    useEffect(() => {
        async function fetchData() {
            const productsCollection = collection(database, "products");
            const productQuery = query(productsCollection)
            const querySnapshot = await getDocs(productQuery);
            const fetchedData: Array<Product> = []
            querySnapshot.forEach((doc) => {
                fetchedData.push({ id: doc.id, ...doc.data() } as Product)
            })
            console.log(fetchedData);
            setProducts(fetchedData);
            console.log(products)
        }
        fetchData()
    }, []);

    const columns = [
        { name: "Tipo de Crédito", uid: "name" },
        { name: "Descipción", uid: "description" },
        { name: "Porcentaje", uid: "percent" },
        { name: "Opciones", uid: "actions" },
    ];


    const renderCell = React.useCallback((user: Product, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Product];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "description":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "percent":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize text-default-400">Tasa de intéres</p>
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-start items-center gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light" style={{ fontSize: '30px', padding: '12px' }}>
                            <BiSolidChevronsDown/>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem>Edit</DropdownItem>
                          <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={products}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );

}
