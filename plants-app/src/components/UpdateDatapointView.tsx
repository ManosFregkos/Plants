import * as React from "react";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {Backdrop, Button, CircularProgress, Stack,} from "@mui/material";
import { PlantRepositoryAPI } from "../../infrastructure/PlantRepositoryAPI.ts";
import { UpdatePlantDatapointReportUseCase } from "../../domain/useCases/UpdatePlantDatapointReportUseCase.ts";
import { useCallback, useState } from "react";
import { DatapointReport } from "../../domain/entities/DatapointReport.ts";
import { GetPlantDatapointReportUseCase } from "../../domain/useCases/GetPlantDatapointReportUseCase.ts";
import ChartDialog from "./Dialogs/ChartDialog.tsx";

type UpdateDatapointViewProps = {
  plantUID: string;
  repository: PlantRepositoryAPI;
};

const UpdateDatapointView = ({
  plantUID,
  repository,
}: UpdateDatapointViewProps) => {
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(null);
  const [toDate, setToDate] = React.useState<Dayjs | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [reports, setReports] = useState<DatapointReport[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleUpdateData = async () => {
    if (!toDate || !fromDate) return;
    try {
      setLoading(true);
      const updateDatapoint = new UpdatePlantDatapointReportUseCase(repository);
      await updateDatapoint.execute(
        fromDate.format("YYYY-MM-DD"),
        toDate.format("YYYY-MM-DD"),
        plantUID,
      );
      const getReports = new GetPlantDatapointReportUseCase(repository);
      setReports(
        await getReports.execute(plantUID, fromDate.format("YYYY-MM-DD")),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setToDate(null);
      setFromDate(null);
    }
  };

  const handleFromDateChange = (newValue: Dayjs | null) => {
    if (newValue && toDate && newValue.isAfter(toDate)) {
      alert("From Date must be less than or equal to To Date!");
    } else {
      setFromDate(newValue);
    }
  };

  const handleToDateChange = (newValue: Dayjs | null) => {
    if (newValue && fromDate && newValue.isBefore(fromDate)) {
      alert("To Date must be greater than or equal to From Date!");
    } else {
      setToDate(newValue);
    }
  };

  const handleCloseDialog = useCallback(() => setOpen(false), [setOpen]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label={"From Date"}
              value={fromDate}
              onChange={handleFromDateChange}
            />
            <DatePicker
              label={"To Date"}
              value={toDate}
              onChange={handleToDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
      <ChartDialog open={open} handleCloseDialog={handleCloseDialog} reports={reports} />
      <Button disabled={!toDate || !fromDate} onClick={handleUpdateData}>
        Update Datapoints
      </Button>
      {reports.length > 0 && !fromDate && !toDate && (
        <Button onClick={() => setOpen(true)}>Show Chart</Button>
      )}
    </Stack>
  );
};
export default UpdateDatapointView;
