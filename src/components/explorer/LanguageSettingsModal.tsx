import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { gbFlag, plFlag } from 'i18n/icons/flags';
import { TFunction, useTranslation } from 'react-i18next';
import { i18n } from 'i18next';

interface LanguageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSettingsModal = ({ isOpen, onClose }: LanguageSettingsModalProps) => {
  const { t, i18n } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('settingsModal.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{changeLanguageSection(i18n, t)}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>{t('modal.close')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const changeLanguageSection = (i18n: i18n, t: TFunction<'translation', undefined>) => {
  return (
    <Flex direction={'column'}>
      <Text fontWeight={'medium'}>{t('settingsModal.changeLanguage')}</Text>
      <Flex gap={2}>
        <IconButton
          aria-label={'en-language'}
          onClick={() => i18n.changeLanguage('en')}
          icon={gbFlag}
          variant={'ghost'}
          disabled={i18n.resolvedLanguage === 'en'}
        />
        <IconButton
          aria-label={'pl-language'}
          onClick={() => i18n.changeLanguage('pl')}
          icon={plFlag}
          variant={'ghost'}
          disabled={i18n.resolvedLanguage === 'pl'}
        />
      </Flex>
    </Flex>
  );
};
