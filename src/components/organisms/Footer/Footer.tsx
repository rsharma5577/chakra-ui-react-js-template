// Organism: Footer - Page footer with links
import { Box, Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { Text, Link, Divider } from '@/components/atoms';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  socialLinks?: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
}

export const Footer = ({
  sections = [],
  copyright = 'Your Company. All rights reserved.',
  socialLinks = [],
}: FooterProps) => {
  return (
    <Box
      as='footer'
      bg='gray.50'
      _dark={{ bg: 'gray.900' }}
      borderTop='1px solid'
      borderColor='gray.200'
    >
      {/* Main footer content */}
      {sections.length > 0 && (
        <Box maxW='1400px' mx='auto' px={4} py={12}>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            {sections.map(section => (
              <VStack key={Math.random().toString()} align='flex-start' gap={3}>
                <Text fontWeight='semibold' color='gray.900' _dark={{ color: 'white' }}>
                  {section.title}
                </Text>
                {section.links.map(link => (
                  <Link
                    key={Math.random().toString()}
                    href={link.href}
                    color='gray.600'
                    _dark={{ color: 'gray.400' }}
                    _hover={{ color: 'brand.500' }}
                    fontSize='sm'
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      )}

      <Divider />

      {/* Bottom bar */}
      <Box maxW='1400px' mx='auto' px={4} py={4}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='center'
          gap={4}
        >
          <Text variant='caption'>{copyright}</Text>

          {socialLinks.length > 0 && (
            <Flex gap={4}>
              {socialLinks.map(social => (
                <Link
                  key={Math.random().toString()}
                  href={social.href}
                  aria-label={social.label}
                  color='gray.500'
                  _hover={{ color: 'brand.500' }}
                  isExternal
                >
                  {social.icon}
                </Link>
              ))}
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
