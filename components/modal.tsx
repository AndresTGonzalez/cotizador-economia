import React, { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Spinner} from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";
import { database } from "@/app/firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";
type Product = {
    id: string,
    name: string,
    description: string,
    percent: number,
    image: string
}
enum InputEnum{
    Id='id',
    Name='name',
    Description='description',
    Percent='percent',
    Image='image'
}
type ModalFormProps = {
    onModalClose: () => void;
  };
  

export default function ModalForm({ onModalClose }: ModalFormProps)  {
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const [inputData, setInputData]=useState<Partial<Product>>({
    name:'',
    description:'',
    percent:0,
    image:''
  });
  const [formError,setFormError]=useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleInputChange= (field:InputEnum,value:string)=>{
    setInputData({...inputData,[field]:value})
  }
  const handleFormSubmit= async ()=>{
    try{
        setLoading(true)
        const productsCollection = collection(database, "products");
        const newProduct:Partial<Product>={
            name:inputData.name,
            description:inputData.description,
            percent:inputData.percent,
            image:inputData.image,
        }
        await addDoc(productsCollection,newProduct);
        setInputData({
            name:'',
            description:'',
            percent:0,
            image:'' 
        })
        onModalClose()
        
    }catch(error){
        setFormError(true);
    }finally{
        setLoading(false)
        onClose()
    }

  }
  return (
    <>
    
      <Button onClick={onOpen} endContent={<BiPlus/>} color="primary">Añadir</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      > 
        <ModalContent>    
          {(onClose) => (
            <>
               
              <ModalHeader className="flex flex-col gap-1">Añadir tipo de crédito</ModalHeader>
              {loading && 
               <div className="flex items-center justify-center">
                <Spinner />
                </div>
               }
              <ModalBody>
                <Input
                  onChange={(e)=> handleInputChange(InputEnum.Name,e.target.value)}
                  value={inputData.name}
                  autoFocus
                  type="text"
                  label="Nombre"
                  placeholder="Ingrese el tipo de crédito"
                  variant="bordered"
                />
                
                <Input
                  onChange={(e)=> handleInputChange(InputEnum.Description,e.target.value)}
                  value={inputData.description}
                  label="Descripción"
                  placeholder="Ingrese la descripción"
                  type="text"
                  variant="bordered"
                />
                <Input
                onChange={(e)=> handleInputChange(InputEnum.Percent,e.target.value)}
                 label="Porcentaje"
                 value={inputData.percent?.toString()}
                 placeholder="Ingrese el porcentaje"
                 type="number"
                 variant="bordered"
                 min="0"
               />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={ handleFormSubmit} isDisabled={loading} isLoading={loading} >
                    Añadir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

