import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

function EditCropDialog({
  open,
  handleClose,
  selectedCrop,
}) {
  const [crop, setCrop] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    if (selectedCrop) {
      setCrop(selectedCrop.crop);
      setPrice(selectedCrop.price);
      setUnit(selectedCrop.unit);
    }
  }, [selectedCrop]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/market/${crop}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: Number(price),
            unit,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Crop</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Crop Name"
            value={crop}
            disabled
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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCropDialog;