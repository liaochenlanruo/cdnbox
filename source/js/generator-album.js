/* global hexo */
"use strict";
hexo.extend.generator.register('album', function (locals) {
        const cdn = this.config['cdn'] || '';
        const albums = locals.data['album'];
        const albumKeys = Object.keys(albums).filter(key => albums[key]['size'] && albums[key]['size'] > 0);
        const albumPageSize = 12;
        const albumSize = albumKeys.length;
        const albumTotalPage = Math.floor(albumSize / albumPageSize + (albumKeys % albumPageSize === 0 ? 0 : 1));
        const pages = [];
        for (let albumPageNum = 1; albumPageNum <= albumTotalPage; albumPageNum++) {
            const currentAlbumPageKeys = albumKeys.slice((albumPageNum - 1) * albumPageSize, albumPageNum * albumPageSize);
            // 添加相册目录页面(分页)
            const currentAlbumPageData = [];
            for (let num = 0; num < currentAlbumPageKeys.length; num++) {
                const currentAlbumPageKey = currentAlbumPageKeys[num];
                const album = albums[currentAlbumPageKey];
                currentAlbumPageData.push({
                    ...album,
                    path: `/album/${currentAlbumPageKey}`,
                    cover: `${cdn}/album/${currentAlbumPageKey}/0.${album['format'] || 'jpg'}`
                });
                // 添加相册列表(分页)
                const photosSize = album.size;
                const photosPageSize = albumPageSize << 1;
                const photosTotalPage = Math.floor(photosSize / photosPageSize + (photosSize % photosPageSize === 0 ? 0 : 1));
                for (let photosPageNum = 1; photosPageNum <= photosTotalPage; photosPageNum++) {
                    const currentPhotosPageData = [];
                    for (let index = 0; index < photosPageSize && (photosPageNum - 1) * photosPageSize + index < photosSize; index++) {
                        currentPhotosPageData.push(`${cdn}/album/${currentAlbumPageKey}/${(photosPageNum - 1) * photosPageSize + index}.${album.format || 'jpg'}`);
                    }
                    pages.push({
                        path: `album/${currentAlbumPageKey}/${photosPageNum === 1 ? '' : photosPageNum + '/'}index.html`,
                        layout: 'album',
                        data: {
                            pageType: 'photos',
                            typeIndexUrl: `/album/${currentAlbumPageKey}`,
                            pageInfo: {
                                pageNum: photosPageNum,
                                pageSize: photosPageSize,
                                totalPage: photosTotalPage,
                                data: currentPhotosPageData
                            }
                        }
                    });
                }
            }
            pages.push({
                path: `album/${albumPageNum === 1 ? '' : albumPageNum + '/'}index.html`,
                layout: 'album',
                data: {
                    pageType: 'album',
                    typeIndexUrl: '/album',
                    pageInfo: {
                        pageNum: albumPageNum,
                        pageSize: albumPageSize,
                        totalPage: albumTotalPage,
                        data: currentAlbumPageData
                    }
                }
            });
        }
        return pages;
    }
);
