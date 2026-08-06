import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

function AddCropDialog({ open, handleClose, onCropAdded }) {
  const [crop, setCrop] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("Quintal");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/market", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop,
          price: Number(price),
          unit,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      onCropAdded();

      handleClose();

      setCrop("");
      setPrice("");
      setUnit("Quintal");
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Crop</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Crop Name"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            fullWidth
          />

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />

          <TextField
            label="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCropDialog;