import { Button, Col, Row } from "antd";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { FaBookOpen } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import Link from "next/link";
const Tutorial = () => {

    return (<>
        <Row>
            <Col span={24}>
                <h5>
                    Descargue el manual técnico y de usuario:
                </h5>
                <div className="my-5" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Link
                        download
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 5,
                            color: 'white',
                            background: '#A44',
                            width: 100,
                            textAlign: 'center',
                            borderRadius: 5
                        }}
                        target="_blank"
                        href={"/assets/tutoriales/manual_de_usuario_final.pdf"}>
                        Descargar Manual de Usuario
                        <FaBookOpenReader fontSize={30} style={{ textAlign: 'center' }} />
                    </Link>
                    <Link
                        download
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 5,
                            color: 'white',
                            background: '#A44',
                            width: 100,
                            textAlign: 'center',
                            borderRadius: 5
                        }}
                        target="_blank"
                        href={"/assets/tutoriales/manual-tecnico-final.pdf"}>
                        Descargar Manual Técnico
                        <FaBookOpen fontSize={30} style={{ textAlign: 'center' }} />
                    </Link>
                </div>
            </Col>

            <Col span={24}></Col>
            <Col span={24}>
                <h5>
                    Ver el siguiente video tutorial:
                </h5>
            </Col>
            <Col span={16} offset={4} className="my-5">
                <MediaPlayer title="Tutorial - Adultos Mayores - GAMEA" src="/assets/tutoriales/tutorial-1.mp4">
                    <MediaProvider />
                    <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
            </Col>
        </Row>
    </>)

}


export default Tutorial;