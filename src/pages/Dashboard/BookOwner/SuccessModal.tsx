import { Box, Modal, Stack, Typography } from "@mui/material";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

type Props = {
  open: boolean;
  onClose: () => void;
};
function SuccessModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "80%",
            sm: 500,
            lg: 700,
          },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 6,
          borderRadius: "1rem",
        }}
      >
        <Stack alignItems={"center"} width={"100%"}>
          <img src='/smiley.png' alt='smiley' className='w-56 mb-5' />
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "600",
              paddingBottom: "0.5rem",
            }}
          >
            Congrats
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "#00000080",
              fontSize: "12px",
            }}
          >
            You have uploaded the book successfully, Wait until we approve it
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
}

export default SuccessModal;
