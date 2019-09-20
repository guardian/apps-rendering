import React from 'react';
import { css } from '@emotion/core'

import HeaderImageCaption from './HeaderImageCaption';

const headerImageStyles = css`
    position: relative;
    img {
        width: 100%;
        display: block;
    }

    margin-bottom: 8px;
`;

interface Asset {
    file: string;
    typeData: AssetTypeData;
}

interface AssetTypeData {
    altText: string;
    caption: string;
    credit: string;
    width: number;
    height: number;
    isMaster?: boolean
}

interface HeaderImageProps {
    assets: Asset[];
}

const HeaderImage = ({ assets }: HeaderImageProps) => {
    if (!assets) return null;

    const assetsWithoutMaster = assets.filter(({ typeData: {isMaster} }) => !isMaster);
    const [{ file, typeData: {caption, credit, altText} }] = assets;
    // TODO: use fastly images
    return (
        <div css={headerImageStyles}>
            <picture>
                {
                    assetsWithoutMaster.map(({ file, typeData }, index) => {
                        return index + 1 === assetsWithoutMaster.length
                            ? <source srcSet={file} media={`(max-width: ${typeData.width}px), (min-width: ${typeData.width}px)`} key={index}/>
                            : <source srcSet={file} media={`(max-width: ${typeData.width}px)`} key={index}/>
                    })
                }
                <img src={file} alt={altText}/>
            </picture>
            < HeaderImageCaption caption={caption} credit={credit}/>
        </div>
    )
}

export default HeaderImage;
