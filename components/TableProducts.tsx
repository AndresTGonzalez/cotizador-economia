"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure, Tooltip, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Spinner } from "@nextui-org/react";
import { database } from '@/app/firebase';
import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { BiSolidChevronsDown } from "react-icons/bi";
import ModalForm from "./modal";

type Product = {
    id: string,
    name: string,
    description: string,
    percent: number,
    image: string
}

export default function TableProducts() {

    const [products, setProducts] = useState<Array<Product>>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [data, setData] = useState<Partial<Product>>({
        name: '',
        description: '',
        percent: 0,
        image: ''
    });

    async function fetchData() {
        const productsCollection = collection(database, "products");
        const productQuery = query(productsCollection)
        const querySnapshot = await getDocs(productQuery);
        const fetchedData: Array<Product> = []
        querySnapshot.forEach((doc) => {
            fetchedData.push({ id: doc.id, ...doc.data() } as Product)
        })
        setProducts(fetchedData);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchData()
    }, []);
    
    useEffect(() => {
        console.log(open)
    }, [open,data,edit]);
    
    const handleModalClose = () => {
        fetchData()
    };
    const columns = [
        { name: "Tipo de Crédito", uid: "name" },
        { name: "Descipción", uid: "description" },
        { name: "Porcentaje", uid: "percent" },
        { name: "Opciones", uid: "actions" },
    ];
    const handleEdit = async (id:any,name:any,des:any,per:any) => {
        setData({
            id:id.toString(),
            name: name.toString(),
            description: des.toString(),
            percent:  parseFloat(per.toString()),
            image: ''
        })
        setOpen(true)
        setEdit(true)
    }
    const handleCloseEdit = () => {
        console.log("cambio")
        setOpen(false)
        setEdit(false)
    };
    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <div className="flex gap-3">
                        <ModalForm onModalClose={handleModalClose} 
                        data={data} openModal={open} 
                        onCloseEdit={handleCloseEdit} edit={edit}/>
                    </div>
                </div>
            </div>
        );
    }, [open,edit]);

    const handleDelete = async (id: any) => {
        try {
            setIsLoading(true)
            const deleteQuery = doc(database, "products", id);
            await deleteDoc(deleteQuery);
            fetchData()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)

        }
    }




    const renderCell = React.useCallback((user: Product, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Product];
        const id = user['id' as keyof Product]
        const name = user['name' as keyof Product]
        const des = user['description' as keyof Product]
        const per = user['percent' as keyof Product]
        
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
                                    <BiSolidChevronsDown />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleEdit(id,name,des,per)}>
                                    Editar
                                </DropdownItem>
                                <DropdownItem onClick={() => handleDelete(id)}>
                                    Eliminar
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table topContent={topContent}>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={products} isLoading={isLoading} loadingContent={<Spinner label="cargando.." />}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>


        </Table>

    );

}
