import ModalWrapper from "@components/ui/modal-wrapper";
import { useRouter } from "next/router";
import React from "react";
import { Modal } from "types/misc-types";
import { trpc } from "@util/trpc/trpc";

export const EditStatProfileModal: React.FC<Modal> = ({
  isOpen, setIsOpen
}) => {
  const router = useRouter();
  const util = trpc.useContext();

  const createStat = trpc.stat.addStatistic.useMutation({
    onSuccess() {
      util.match.getById.invalidate();
    }
  })

  const submit = async (e: React.SyntheticEvent) => {

  }

  return ( 
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={submit}>

      </form>
    </ModalWrapper>
   );
}