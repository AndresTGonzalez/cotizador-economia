import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Spinner } from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";
import { database } from "@/app/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
type Product = {
  id: string,
  name: string,
  description: string,
  percent: number,
  image: string
}
enum InputEnum {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Percent = 'percent',
  Image = 'image'
}
type ModalFormProps = {
  onModalClose: () => void;
  onCloseEdit: () => void;
  data: Partial<Product>;
  openModal: boolean
  edit: boolean
};


export default function ModalForm({ onModalClose, data, openModal, onCloseEdit, edit }: ModalFormProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [inputData, setInputData] = useState<Partial<Product>>({
    name: '',
    description: '',
    percent: 0,
    image: ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (openModal) {
      onOpen()
    }
    if (edit) {
      setInputData({
        name: data.name,
        description: data.description,
        percent: data.percent,
        image: ''
      })
    } else {
      setInputData({
        name: '',
        description: '',
        percent: 0,
        image: ''
      })
    }

  }, [openModal, edit]);

  const handleInputChange = (field: InputEnum, value: string) => {
    setInputData({ ...inputData, [field]: value })
  }
  const handleFormSubmit = async () => {
    try {
      if (edit) {
        console.log("editar")
        console.log(data.id)
        const newProduct: Partial<Product> = {
          name: inputData.name,
          description: inputData.description,
          percent: inputData.percent,
          image: inputData.image,
        }
        setLoading(true)
        const editquery = doc(database, "products", data.id!);
        await setDoc(editquery, newProduct);
        setInputData({
          name: '',
          description: '',
          percent: 0,
          image: ''
        })
        toast.success("Editado correctamente")
        onModalClose()
        onCloseEdit()
      } else {
        setLoading(true)
        const productsCollection = collection(database, "products");
        const newProduct: Partial<Product> = {
          name: inputData.name,
          description: inputData.description,
          percent: inputData.percent,
          image: inputData.image,
        }
        await addDoc(productsCollection, newProduct);
        setInputData({
          name: '',
          description: '',
          percent: 0,
          image: ''
        })
        onModalClose()
        toast.success("Agregado correctamente")
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      onClose()
    }

  }
  return (
    <>

      <Button onClick={onOpen} endContent={<BiPlus />} color="primary">Añadir</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>

              <ModalHeader className="flex flex-col gap-1">{edit ? "Editar tipo de crédito" : "Añadir tipo de crédito"}</ModalHeader>
              {loading &&
                <div className="flex items-center justify-center">
                  <Spinner />
                </div>
              }
              <ModalBody>
                <Input
                  onChange={(e) => handleInputChange(InputEnum.Name, e.target.value)}
                  value={inputData.name}
                  autoFocus
                  type="text"
                  label="Nombre"
                  placeholder="Ingrese el tipo de crédito"
                  variant="bordered"
                />

                <Input
                  onChange={(e) => handleInputChange(InputEnum.Description, e.target.value)}
                  value={inputData.description}
                  label="Descripción"
                  placeholder="Ingrese la descripción"
                  type="text"
                  variant="bordered"
                />
                <Input
                  onChange={(e) => handleInputChange(InputEnum.Percent, e.target.value)}
                  label="Porcentaje"
                  value={inputData.percent?.toString()}
                  placeholder="Ingrese el porcentaje"
                  type="number"
                  variant="bordered"
                  min="0"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={() => { onClose(); onCloseEdit(); }}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={handleFormSubmit} isDisabled={loading} isLoading={loading} >
                  {edit ? "Editar" : "Añadir"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

