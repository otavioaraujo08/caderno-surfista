'use client';
import { menuItems } from './menuItems';
import {
    BoxBody,
    BoxIcon,
    Container,
    PatternBox,
    SubtitleBody,
    TitleBody,
} from './styles';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Fab } from '@mui/material';
import { IoAddCircleOutline } from 'react-icons/io5';

export const Body = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handlewChangeState = () => {
        setIsOpen(!isOpen);
    };

    const redirectUser = (path: string) => {
        return router.push(`/home/${path}`);
    };

    return (
        <Container>
            {menuItems.map((item) => {
                const { title, children } = item;

                return (
                    <>
                        <PatternBox key={title}>
                            <TitleBody>{title}</TitleBody>

                            {isOpen ? (
                                <BiChevronUp
                                    size="1.6rem"
                                    onClick={handlewChangeState}
                                    style={{ cursor: 'pointer' }}
                                />
                            ) : (
                                <BiChevronDown
                                    size="1.6rem"
                                    onClick={handlewChangeState}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </PatternBox>

                        {isOpen
                            ? children.map((child) => {
                                  const { title, path, icon } = child;

                                  return (
                                      <BoxBody
                                          key={title}
                                          onClick={() => redirectUser(path)}
                                      >
                                          <BoxIcon>{icon}</BoxIcon>

                                          <SubtitleBody>{title}</SubtitleBody>
                                      </BoxBody>
                                  );
                              })
                            : null}
                    </>
                );
            })}

            <Fab color="primary" aria-label="add">
                <IoAddCircleOutline />
            </Fab>
        </Container>
    );
};
