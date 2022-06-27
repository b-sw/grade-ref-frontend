import { ArrowBackIcon } from "@chakra-ui/icons";
import {Button, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import {Match} from "../../../entities/Match";
import {MatchListItem} from "../../adminDashboard/matches/MatchListItem";
import {Path} from "../../../shared/Path";
import {uuid} from "../../../shared/uuid";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import {scrollbarStyle} from "../../dashboard/shared/styles";
import { motion } from 'framer-motion';
import {useRef} from "react";

export const enum MatchData {
  Details = 'Match Details',
  Assignments = 'Assignments',
  Fouls = 'Disciplinary sanctions',
  Features = 'Conclusions',
}

interface Props {
  match: Match;
  readOnly?: boolean;
}

const PADDING = 4;

export const MatchOverviewPanel = (props: Props) => {
  const navigate: NavigateFunction = useNavigate();
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const overviewRef: any = useRef();
  const detailsRef: any = useRef();
  const assignmentsRef: any = useRef();
  const foulsRef: any = useRef();
  const conclusionsRef: any = useRef();

  return (
    <>
      <Flex
        overflow={'hidden'}
        gap={4}
      >
        <Spacer />

        <Flex
          direction={'column'}
          borderRadius={10}
          p={PADDING}
          backgroundColor={'gray.300'}
          shadow={'md'}
          overflowY={'hidden'}
          alignItems={'center'}
          flexGrow={1}
          maxH={['90vh', '100%']}
          gap={PADDING}
        >
          <Flex
            w={'100%'}
            alignItems={'center'}
          >
            <Button
              as={motion.div}
              whileHover={{ right: 5 }}
              variant={'ghost'}
              leftIcon={<ArrowBackIcon />}
              onClick={() => { navigate(`${Path.ADMIN_DASHBOARD}/${leagueId}`); }}
              mr={PADDING}
            >
              Dashboard
            </Button>
            <Spacer />
            <MatchListItem key={props.match.id} readOnly={true} match={props.match} />
          </Flex>

          <Flex
            gap={PADDING}
            overflowY={'hidden'}
            flexGrow={1}
            w={'100%'}
            h={['auto', '100%']}
            maxH={['90vh', '100%']}
          >
            <Flex
              direction={'column'}
              borderRadius={10}
              w={'20%'}
            >
              <Text fontSize={'2xl'} fontWeight={'medium'}>Page sections</Text>
              <Link
                onClick={() => {
                  overviewRef.current.scrollTo({
                    top: detailsRef.current.offsetTop - overviewRef.current.offsetTop,
                    behavior: 'smooth',
                  });
                }}
              >
                <Text fontSize={'xl'}>{MatchData.Details}</Text>
              </Link>

              <Link
                onClick={() => {
                  console.log('assignmentsRef', overviewRef.current);
                  overviewRef.current.scrollTo({
                    top: assignmentsRef.current.offsetTop - overviewRef.current.offsetTop,
                    behavior: 'smooth',
                  });
                }}
              >
                <Text fontSize={'xl'} fontWeight={'default'}>{MatchData.Assignments}</Text>
              </Link>

              <Link
                onClick={() => {
                  overviewRef.current.scrollTo({
                    top: foulsRef.current.offsetTop - overviewRef.current.offsetTop,
                    behavior: 'smooth',
                  });
                }}
              >
                <Text fontSize={'xl'}>{MatchData.Fouls}</Text>
              </Link>

              <Link
                onClick={() => {
                  overviewRef.current.scrollTo({
                    top: conclusionsRef.current.offsetTop - overviewRef.current.offsetTop,
                    behavior: 'smooth',
                  });
                }}
              >
                <Text fontSize={'xl'}>{MatchData.Features}</Text>
              </Link>
            </Flex>

            <Flex
              direction={'column'}
              borderRadius={10}
              p={PADDING}
              backgroundColor={'gray.200'}
              w={'80%'}
              overflowY={'hidden'}
            >
              <Flex
                direction={'column'}
                overflowY={'scroll'}
                css={scrollbarStyle}
                ref={overviewRef}
              >
                <Flex minH={'500px'} ref={detailsRef}>
                  <Text fontSize={'2xl'}>Match Details</Text>
                </Flex>
                <Flex minH={'500px'} ref={assignmentsRef}>
                  <Text fontSize={'2xl'}>Assignments</Text>
                </Flex>
                <Flex minH={'500px'} ref={foulsRef}>
                  <Text fontSize={'2xl'}>Disciplinary sanctions</Text>
                </Flex>
                <Flex minH={'500px'} ref={conclusionsRef}>
                  <Text fontSize={'2xl'}>Conclusions</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Spacer />
      </Flex>
    </>
  );
}