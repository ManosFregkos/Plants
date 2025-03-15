import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import ChartComponent from "../ChartComponent.tsx";
import { DatapointReport } from "../../../domain/entities/DatapointReport.ts";

type ChartDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
  reports: DatapointReport[];
};

const ChartDialog = ({
  handleCloseDialog,
  open,
  reports,
}: ChartDialogProps) => {
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      fullWidth
      fullScreen
      open={open}
      onClose={handleCloseDialog}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Data Plant
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        X
      </IconButton>
      <DialogContent sx={{ p: 2 }}>
        <ChartComponent data={reports} />
      </DialogContent>
    </Dialog>
  );
};
export default ChartDialog;
