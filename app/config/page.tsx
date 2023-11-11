"use client";
import { FormEvent, useState, useEffect } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {
    Input,
    Button,
    Progress,
} from "@nextui-org/react";
import Image from "next/image";
import { Label } from "reactstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../firebase";
import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import Drop from "@/components/dropdown";
import toast from "react-hot-toast";
type Company = {
    id: string,
    name: string,
    logo: string,
    secure: number,
}
enum InputEnum {
    Id = 'id',
    Name = 'name',
    logo = 'logo',
    secure = 'secure'
}

export default function AdminPage() {
    const [value, setValue] = useState(0);
    const [inputData, setInputData] = useState<Partial<Company>>({
        id: '',
        name: '',
        logo: '',
        secure: 0
    });
    const [loading, setLoading] = useState<boolean>(true);

    const handleInputChange = (field: InputEnum, value: string) => {
        setInputData({ ...inputData, [field]: value })
        console.log(inputData)
    }
    const handleImageChange = async (field: InputEnum, e: any) => {
        setLoading(true)
        const storageRef = ref(storage, 'logo')
        const file = await uploadBytes(storageRef, e)
        const url = await getDownloadURL(file.ref)
        setInputData({ ...inputData, [field]: url })
        setLoading(false)
    };
    async function fetchData() {
        const productsCollection = collection(database, "company");
        const productQuery = query(productsCollection)
        const querySnapshot = await getDocs(productQuery);
        const fetchedData: Array<Company> = []
        querySnapshot.forEach((doc) => {
            fetchedData.push({ id: doc.id, ...doc.data() } as Company)
        })
        setInputData(fetchedData[0]);
        setLoading(false);
    }
    useEffect(() => {
        fetchData()
    }, []);

    const handleFormSubmit = async () => {
        try {
            const newProduct: Partial<Company> = {
                name: inputData.name,
                logo: inputData.logo,
                secure: inputData.secure,
            }
            setLoading(true)
            const editquery = doc(database, "company", inputData.id!);
            await setDoc(editquery, newProduct);
            fetchData()
            toast.success("Editado correctamente")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }


    return (
        <main className="flex w-screen h-screen items-center justify-center bg-neutral-100">
            <div className="absolute top-4 right-4">
                <Drop />
            </div>
            <div className="absolute top-4 center-4">
                Configura tu empresa:{inputData.name?.toUpperCase()}
            </div>
            <div className=" w-2/4 h-4/5 bg-white rounded-xl shadow-lg ">
                <div className=" mt-20 h-5/5 flex  items-center justify-center rounded-r-xl">
                    <form
                        action=""
                        className="w-3/4 h-72 flex flex-col items-center justify-between mb-60"
                    >
                        <h2 className="text-2xl font-light mb-4">Ingresa la información de tu empresa</h2>
                        <div className="mb-4 w-full md:w-96">
                            <Input
                                type="text" label="Nombre"
                                fullWidth className="mb-4"
                                onChange={(e) => handleInputChange(InputEnum.Name, e.target.value)}
                                value={inputData.name}
                            />
                            {loading && (
                                <Progress
                                    size="sm"
                                    isIndeterminate
                                    aria-label="Loading..."
                                    className="max-w-md"
                                />
                            )}

                            <Input
                                type="number"
                                label="Monto de seguro"
                                fullWidth className="mb-4"
                                onChange={(e) => handleInputChange(InputEnum.secure, e.target.value)}
                                value={inputData.secure?.toString()} />
                            {loading && (
                                <Progress
                                    size="sm"
                                    isIndeterminate
                                    aria-label="Loading..."
                                    className="max-w-md"
                                />
                            )}

                            <div className="mb-4 flex  flex-col">
                                <Label>Logo de la empresa</Label>
                                {!loading && <Image
                                    src={inputData.logo! || "/load.jpg"}
                                    alt="Picture of the author"
                                    width={200}
                                    height={200}
                                    objectFit="cover"
                                />

                                }


                            </div>

                            <Input type="file" accept="image/*" onChange={(e) => handleImageChange(InputEnum.logo, e.target.files![0])} />
                            {loading && (
                                <Progress
                                    size="sm"
                                    isIndeterminate
                                    aria-label="Loading..."
                                    className="max-w-md"
                                />
                            )}
                        </div>


                        <div className="mb-4 w-full md:w-96" >
                            <Button onClick={handleFormSubmit} color="primary" fullWidth isDisabled={loading}>
                                Editar
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}