interface ImageProps {
  linkGambar: string;
}


const Image: React.FC<ImageProps> = ({ linkGambar }) => {
    return <img src={linkGambar} />;
};

export default Image;