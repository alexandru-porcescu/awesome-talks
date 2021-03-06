import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import styled from 'styled-components'
import remcalc from 'remcalc'

import Query from './../Components/Query'
import Video from './../Components/Video'
import SPEAKER_VIDEOS from '../Queries/SPEAKER_VIDEOS'
import TwitterIcon from '../assets/twitter.svg'
import humanize, { urlify } from '../Utils/strings'
import Nav from './../Components/Nav'
import CookieBanner from './../Components/CookieBanner'
import Error404 from './../Components/Errors/Error404'
import SpeakerMeta from './../Components/MetaTags/Speaker'

const Wrapper = styled(Row)`
    margin-bottom: ${remcalc(30)};

    * {
        box-sizing: border-box;
    }

    @media (max-width: ${remcalc(768)}) {
        justify-content: center;
    }
`

const Img = styled.img`
    margin-right: ${remcalc(20)};
    box-shadow: ${props => props.theme.shadow};
    width: ${remcalc(200)};
    min-width: ${remcalc(200)};

    @media (max-width: ${remcalc(768)}) {
        margin: auto;
    }
`

const TwitterImg = styled.img`
    margin-left: ${remcalc(-10)};
    background: aliceblue;
    border-radius: 10px;
    padding: 10px;
`

const Desc = styled(Flex)`
    @media (max-width: ${remcalc(768)}) {
        flex-direction: column;

        h1 {
            margin-top: 10px;
            margin-bottom: 0;
        }
    }
`

const Section = styled.div`
    width: 100%;

    p {
        word-break: break-word;
        max-width: 400px;
    }

    @media (max-width: ${remcalc(768)}) {
        max-width: 80%;
        margin: auto;

        p {
            word-break: break-word;
            text-align: center;
        }
    }
`

export const SpeakerInfo = ({ photo, name, bio, twitter, videoPage }) => (
    <Wrapper>
        {!videoPage ? <SpeakerMeta name={name} photo={photo} /> : null}
        <Desc>
            {photo ? (
                <Img src={photo.url} alt={name} height="200" width="200" />
            ) : null}
            <Section>
                <Header title={humanize(name)} noSearch small />
                <p dangerouslySetInnerHTML={{ __html: urlify(bio) }} />{' '}
                <Flex justifyBetween alignCenter>
                    {twitter ? (
                        <a
                            className="no-hover"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://twitter.com/${twitter}`}
                        >
                            <TwitterImg
                                src={TwitterIcon}
                                alt="Twitter"
                                width="48"
                            />
                        </a>
                    ) : null}
                    <a
                        className="no-hover"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://github.com/SaraVieira/awesome-talks/issues/new?title=Wrong%20Speaker%20info%20for%20${name}&body=Hey!%20The%20info%20on%20${name}%20is%20wrong,%20what%20is%20wrong%20is`}
                    >
                        Wrong Info?
                    </a>
                </Flex>
            </Section>
        </Desc>
    </Wrapper>
)

export default ({
    match: {
        params: { speaker }
    }
}) => (
    <Grid>
        <div role="banner">
            <Nav />
        </div>
        <main>
            <Row>
                <Col xs={12}>
                    <Query
                        query={SPEAKER_VIDEOS}
                        variables={{ name: humanize(speaker) }}
                    >
                        {({ data: { allSpeakerses } }) => {
                            if (!allSpeakerses.length) {
                                return <Error404 />
                            }

                            return (
                                <Section>
                                    <SpeakerInfo {...allSpeakerses[0]} />
                                    <Row>
                                        <Header title="Talks" noSearch />
                                    </Row>
                                    <Row>
                                        {allSpeakerses.length &&
                                            allSpeakerses[0].videoses.length &&
                                            allSpeakerses[0].videoses.map(v => (
                                                <Video key={v.id} talk={v} />
                                            ))}
                                    </Row>
                                </Section>
                            )
                        }}
                    </Query>
                </Col>
            </Row>
        </main>
        <CookieBanner />
    </Grid>
)
