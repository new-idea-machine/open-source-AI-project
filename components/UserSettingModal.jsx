import * as React from "react";
import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SettingsIcon from "@mui/icons-material/Settings";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "primary.light",
  border: "2px solid grey",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function UserSettingModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Set Chat Styles" placement="bottom-end">
        <IconButton sx={{ m: 2 }} onClick={handleOpen}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Modal hideBackdrop open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5">Chat Styles</Typography>
          <Typography sx={{ mt: 2 }}>
            This is a list of styles that you can use to customize your chat.
          </Typography>
          <Box sx={{ mt: 2, bgcolor: "success.light", borderRadius: "10px" }}>
            <FormControl sx={{ ml: 2 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{
                  color: "text.primary",
                  fontStyle: "oblique",
                  m: 1,
                  fontSize: 25,
                  letterSpacing: 2,
                }}>
                Style
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="funny"
                name="radio-buttons-group">
                  <FormControlLabel
                  value="default"
                  control={<Radio />}
                  label="Default"
                />
                <FormControlLabel
                  value="funny"
                  control={<Radio />}
                  label="Funny"
                />
                <FormControlLabel
                  value="sarcastic"
                  control={<Radio />}
                  label="Sarcastic"
                />
                <FormControlLabel
                  value="serious"
                  control={<Radio />}
                  label="Serious"
                />
                <FormControlLabel
                  value="angry"
                  control={<Radio />}
                  label="Angry"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button sx={{ mt: 4 }} variant="contained" onClick={handleClose}>
            Close Window
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
