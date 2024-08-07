import { Box, FormControl, Modal } from "@mui/material";
import ShowFieldValue from "./ShowFieldValue";
import { BookOwner } from "./OwnersTable";

type Props = {
  bookOwner: BookOwner;
  handleCloseModal: () => void;
};
function ViewModal({ bookOwner, handleCloseModal }: Props) {
  const ownerDetails = {
    name: bookOwner.owner.name,
    email: bookOwner.owner.email,
    location: bookOwner.location,
    phone: bookOwner.owner.phone,
  };
  return (
    <Modal
      open={Boolean(bookOwner?.id)}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 6,
          borderRadius: "1rem",
        }}
      >
        <FormControl sx={{ width: "100%" }}>
          {Object.keys(ownerDetails!).map((value) => {
            type valueType = "name" | "email" | "phone" | "location";
            return (
              <ShowFieldValue
                value={ownerDetails?.[value as valueType]}
                name={value}
              />
            );
          })}
        </FormControl>
      </Box>
    </Modal>
  );
}

export default ViewModal;
