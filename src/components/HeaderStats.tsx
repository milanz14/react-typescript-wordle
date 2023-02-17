import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

import { words } from "../data/words";

const HeaderStats = () => {
  return (
    <Stat>
      <StatLabel>Current # Of words in Library:</StatLabel>
      <StatNumber>{words.length}</StatNumber>
    </Stat>
  );
};

export default HeaderStats;
