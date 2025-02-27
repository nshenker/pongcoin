"use client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IBM_Plex_Mono } from "next/font/google";

interface BootstrapDialogTitleProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const IBM_Plex_Mono_Font = IBM_Plex_Mono({
  variable: "--font-IBM_Plex_Mono-sans",
  subsets: ["latin"],
  weight: "400",
});
function BootstrapDialogTitle(props: BootstrapDialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        fontSize: "1.2rem",
        p: 1.2,
        borderBottom: "2px solid rgba(255, 255, 255, 0.22)",
        fontWeight: "600",
      }}
      {...other}
    >
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 6,
            top: 6,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
}
export default function Success({
  isDialogOpen,
  setIsDialogOpen,
  setMainDialog,
  txn
}: any) {
  return (
    <Dialog
      onClose={() => setIsDialogOpen(false)}
      disableScrollLock
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
      sx={{
        "& .MuiDialogContent-root": {
          padding: "1.5rem 1rem",
        },
        "& .MuiDialogActions-root": {
          padding: "1rem",
        },
        "& .MuiDialog-container": {
          backdropFilter: "blur(2px)",
        },
        "& .MuiPaper-root": {
          maxWidth: "500px !important",
          borderRadius: "10px",
          background: "#FAF3E0",
          backdropFilter: "blur(12.5px)",
          color: "#000",
          width: { md: "100% !important", xs: "500px !important" },
          overflowX: { md: "auto", xs: "scroll" },
          boxShadow: "inset 0px 0px 15px rgba(255, 255, 255, 0.4)",
        },
        "& p,div,a": {
          fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
          // fontSize:"15px"
        },
       
      }}
    >
      <BootstrapDialogTitle onClose={() => {setMainDialog(false),setIsDialogOpen(false)}}>
        Success
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography textAlign={"center"}> You left the game successfully.</Typography>

        <Box
          mt={"1.5rem"}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            "& button,a": {
              fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
              color: "#fff",
              background: "#000",
              textTransform: "capitalize",
              fontSize: "16px",
              border: "1px solid #E25822",
              height: "36px",
              // width: "102px",
              fontWeight: "400",
              px: "1rem",
              borderRadius: "0",
              position: "relative",
              // top: "-2px",
              // right: "-2px",
              transition: "0.5s all",
            },

            "&:hover": {
              "& button,a": {
                top: "0",
                right: "0",
                background: "#000",
              },
            },
          }}
          className="btn_wrap"
        >
          <Button
          onClick={() => window.open(`https://solscan.io/tx/${txn}`, "_blank")}
        
          >
            View Txn
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
