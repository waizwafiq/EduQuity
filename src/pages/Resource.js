import { useColorContext } from "../context/ColorContextProvider";
import {
    Navbar,
    Button,
    Header,
    Subtitle,
    Card,
    LabelCircle,
    ResourceCard,
    ClickableCard,
    ResourceLogDash,
} from "../components";
import { useParams } from "react-router-dom";
import React from "react";
import supabaseClient from "./utils/supabase";
import { DataGrid } from '@mui/x-data-grid';
import CircleIcon from "@mui/icons-material/Circle";
import AddResourceModal from "../components/AddResourceModal";
import { Input, MenuItem, TextField } from "@mui/material";
import RequiredModal from "../components/RequiredResoureModal";

const ResourceType = {
    1: 'Laptop',
    2: 'Tablet',
    3: 'Smartphone',
    4: 'IT Teacher',
    5: 'IT Technician',
}

const DataTable = ({ inventoryData, id }) => {
    const renderCellCondition = ({ row }) => {
        return (
            <span
                className={`flex justify-center items-center gap-2 py-1 px-4 rounded-[4.94px] text-center 
            ${row.condition === "MEDIUM" ? "text-[#FF8A00] bg-[#FFC47E]/[.47]" : ""
                    }
            ${row.condition === "GOOD" ? "text-[#00DE0A] bg-[#7CFF82]/[.47]" : ""
                    } 
            ${row.condition === "BAD" ? "text-[#FF0000] bg-[#FF7C7C]/[.47]" : ""
                    }`}
            >
                <CircleIcon sx={{ fontSize: "8px" }} /> {row.condition}
            </span>
        );
    };
    const deviceColumns = [
        {
            field: "serial_number",
            headerName: id == 4 || id == 5 ? "Staff" : "Serial Number",
            width: 400,
            // width: "25%",
            headerAlign: "center",
            align: "center",
            renderHeader: () => <strong><b>{id == 4 || id == 5 ? "Staff" : "Serial Number"}</b></strong>
        },
        {
            field: "model",
            headerName: id == 4 || id == 5 ? "Name" : "Model",
            width: 400,
            // width: "25%",
            headerAlign: "center",
            align: "center",
            renderHeader: () => <strong><b>{id == 4 || id == 5 ? "Name" : "Model"}</b></strong>
        },
        {
            field: "condition",
            headerName: "Condition",
            width: 400,
            // width: "25%",
            headerAlign: "center",
            renderHeader: () => <strong><b>Condition</b></strong>,
            renderCell: renderCellCondition,
            align: "center",

        }
    ]
    const humanColumns = [
        {
            field: "serial_number",
            headerName: id == 4 || id == 5 ? "Staff" : "Serial Number",
            width: 400,
            // width: "25%",
            headerAlign: "center",
            align: "center",
            renderHeader: () => <strong><b>{id == 4 || id == 5 ? "Staff" : "Serial Number"}</b></strong>
        },
        {
            field: "model",
            headerName: id == 4 || id == 5 ? "Name" : "Model",
            width: 400,
            // width: "25%",
            headerAlign: "center",
            align: "center",
            renderHeader: () => <strong><b>{id == 4 || id == 5 ? "Name" : "Model"}</b></strong>
        }
    ]
    return (
        <DataGrid
            rows={inventoryData}
            columns={id == 4 || id == 5 ? humanColumns : deviceColumns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
        />
    )
}

const Resource = ({ themeStyles }) => {
    const { id } = useParams();
    const colors = useColorContext();
    const [inventoryData, setInventoryData] = React.useState([])
    const [requiredResources, setRequiredResources] = React.useState(0);
    const [toUpdateRequired, setToUpdateRequired] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const [openRequired, setOpenRequired] = React.useState(false)
    
    const [newData, setNewData] = React.useState({
        type : id,
        serial_number : '',
        model :'',
        condition : 'GOOD',
        updated : new Date(Date.now()).toUTCString(),
    })
    const getData = async () => {
        const { data: userData } = await supabaseClient.auth.getUser()
        const { data: inventoryData } = await supabaseClient.from("resource").select("*").order('updated',{ascending:false}).eq("school_id", userData?.user.id).eq('type', id)
        const {data : requiredNumber} = await supabaseClient.from("required_resources").select("*").eq('school_id',userData?.user.id).eq("type",id).single();
        setRequiredResources(requiredNumber.number_required)
        console.log('Required', requiredNumber)
        setInventoryData(inventoryData)
        setToUpdateRequired(requiredNumber.number_required)
    }
    React.useEffect(() => {
        getData()
    }, [])

    const addDevice = async() => {
        // setInventoryData([newData,...inventoryData])
        const { data: userData } = await supabaseClient.auth.getUser()
        const {data,error} = await supabaseClient.from("resource").insert(
            {...newData,
                school_id : userData?.user.id
             }
        ).select('id')
        setInventoryData([{id:data[0]?.id,...newData},...inventoryData])
        setOpen(false)
    }

    const updateNumber = async() => {
        const { data: userData } = await supabaseClient.auth.getUser()
        const {data, error} = await supabaseClient.from("required_resources").update({
            number_required : toUpdateRequired
        }).eq('school_id',userData?.user.id).eq('type',id)

        console.log(error)
        alert('Required Resources Updated !')
        setRequiredResources(toUpdateRequired)
        setOpenRequired(false)
    }

    return (
        <div
            className="min-h-screen"
            style={{ ...themeStyles, backgroundColor: colors.BGGrey }}
        >
            <Navbar />
            <div className="mx-8 pl-6 pr-6 pt-6 pb-2 flex justify-between items-center">
                <Header text="School Inventory" />
                
                <Button onClick={()=>{setOpenRequired(true)}} text={`Required  : ${requiredResources}`} className="text-base" rounded={true} />
            </div>
            <Subtitle text="Manage and monitor the school resources." />
            <div className="flex justify-center align-center my-8">
                <div className="mx-14 px-6 py-6 bg-white h-full w-full rounded-[20px]">
                    <div className="pb-2 text-xl">
                        <b className="text-xl">{ResourceType[id]} List</b>
                    </div>

                    <DataTable inventoryData={inventoryData} id={id} />
                    <div className="pt-4">
                        <Button onClick={() => { setOpen(true) }} text={`Add ${id == 4 || id == 5 ? ('Staff') : ('Device')}`} />
                    </div>


                </div>
            </div>
            <AddResourceModal open={open} onClose={() => {
                setOpen(false)
            }}>
                <div >
                    <div className="pb-2 text-xl">
                        <b className="text-xl">Add {ResourceType[id]}</b>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="pr-4">{id == 4 || id == 5 ? "Staff":"Serial Number"}</div>
                        <TextField variant="outlined" size="small" onChange={(e)=>{
                            newData.serial_number = e.target.value
                        }}/>
                    </div>
                    <div className="flex items-center mt-4 justify-between">
                        <div className="pr-4">{id == 4 || id == 5 ? "Name":"Model"}</div>
                        <TextField variant="outlined" size="small" onChange={(e)=>{
                            newData.model = e.target.value
                        }}/>
                    </div>
                    {id !=4 && id!=5 && (
                        <div className="flex items-center mt-4 justify-between">
                        <div className="pr-4">Condition</div>
                        <TextField size="small" fullWidth select defaultValue={"GOOD"} onChange={(e)=>{
                            newData.condition = e.target.value
                        }}>
                            {["GOOD", "MEDIUM", "BAD"].map((data) => {
                                return (
                                    <MenuItem key={data} value={data}>
                                        {data}
                                    </MenuItem>
                                )
                            })}
                        </TextField>

                    </div>
                    )}
                    <div className="mt-4">
                        <Button onClick={addDevice} text={`Add ${id == 4 || id == 5 ? ('Staff') : ('Device')}`} />
                    </div>
                </div>
            </AddResourceModal>
            <RequiredModal open={openRequired} onClose={() => {
                setOpenRequired(false)
            }}>
            <div >
                    <div className="pb-2 text-xl">
                        <b className="text-xl">Edit Required Resources : {ResourceType[id]}</b>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="pr-4">Number</div>
                        <TextField variant="outlined" type="number" value={toUpdateRequired} size="small" onChange={(e)=>{
                            setToUpdateRequired(e.target.value)
                        }}/>
                    </div>
                    
                    <div className="mt-4">
                        <Button onClick={updateNumber} text={`Update Number`} />
                    </div>
                </div>
            </RequiredModal>
        </div>

    );
}

export default Resource;