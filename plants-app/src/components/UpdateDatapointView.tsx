import * as React from 'react';
import {Dayjs} from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Backdrop, Button, CircularProgress, Stack} from "@mui/material";
import {PlantRepositoryAPI} from "../../infrastructure/PlantRepositoryAPI.ts";
import {UpdatePlantDatapointReportUseCase} from "../../domain/useCases/UpdatePlantDatapointReportUseCase.ts";
import {useEffect, useState} from "react";
import {DatapointReport} from "../../domain/entities/DatapointReport.ts";
import {GetPlantDatapointReportUseCase} from "../../domain/useCases/GetPlantDatapointReportUseCase.ts";

type UpdateDatapointViewProps = {
  plantUID: string;
  repository: PlantRepositoryAPI;
}

const UpdateDatapointView = ({plantUID, repository}: UpdateDatapointViewProps) => {
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(null);
  const [toDate, setToDate] = React.useState<Dayjs | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [reports, setReports] = useState<DatapointReport[]>([])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const getReports = new GetPlantDatapointReportUseCase(repository)
        setReports(await getReports.execute(plantUID, "2025-3-12"))
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [repository]);

  const handleUpdateData = async () => {
    if(!toDate || !fromDate) return
    try{
      setLoading(true);
      const updateDatapoint = new UpdatePlantDatapointReportUseCase(repository)
      await updateDatapoint.execute(fromDate.format("YYYY-MM-DD"), toDate.format("YYYY-MM-DD"), plantUID)
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
      setToDate(null)
      setFromDate(null)
    }
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Backdrop sx={{color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary"/>
      </Backdrop>
      <Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label={'From Date'} value={fromDate} onChange={(newValue) => setFromDate(newValue)}/>
            <DatePicker label={'To Date'} value={toDate} onChange={(newValue) => setToDate(newValue)}/>
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
      <Button disabled={!toDate || !fromDate} onClick={handleUpdateData}>Update Datapoints</Button>
    </Stack>
  )
}
export default UpdateDatapointView;