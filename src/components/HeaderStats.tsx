import { Stat, StatLabel } from "@chakra-ui/react";

import { words } from "../data/words";

const HeaderStats = (): JSX.Element => {
  return (
    <Stat>
      <StatLabel>Current # Of words in Library: {words.length}</StatLabel>
    </Stat>
  );
};

export default HeaderStats;
