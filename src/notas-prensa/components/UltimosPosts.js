import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import tipo1icon from '../../../assets/img/tipo-1.svg';
import tipo2icon from '../../../assets/img/tipo-2.svg';
import tipo3icon from '../../../assets/img/tipo-3.svg';

const UltimosPosts = () => {

    // Usar el hook useSelect para obtener los últimos 4 posts
    const posts = useSelect((select) => {
        const { getEntityRecords } = select('core');
        return getEntityRecords('postType', 'post', { per_page: 4, orderby: 'date', order: 'desc' });
    });

    const getFeaturedImageUrl = useSelect((select) => {
        const { getMedia } = select('core');
        return ( args ) => {
            return getMedia(args.id)?.source_url;
        }
    });

    const getPostCategories = useSelect((select) => {
        const { getEntityRecords } = select('core');
        return ( args ) => {
            return getEntityRecords('taxonomy', 'category', { post: args.id });
        }
    });

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    return (
        <div className='block-editor-block-list__layout'>
            {!posts ? 'Cargando...' : posts.map((post) => {
                const featuredImageId = post.featured_media;
                const featuredImageUrl = getFeaturedImageUrl({id: featuredImageId});

                const postCategories = getPostCategories({ id: post.id });
                let tipo = 1;

                if(postCategories){
                    if(postCategories[0].slug == 'tipo-2'){
                        tipo = 2;
                    }
                    else if(postCategories[0].slug == 'tipo-3'){
                        tipo = 3;
                    }
                }
                
                return (
                    <div key={post.id} className='wp-block-ma-ndp-ma-single-nota'>
                        <div className="nota-prensa">
                            <div className='nota-prensa-header'>
                                <div className="nota-prensa-img" style={featuredImageUrl ? {backgroundImage: 'url('+featuredImageUrl+')'} : {}}>
                                    {!featuredImageUrl && <div className='nota-prensa-no-img'></div>}
                                </div>

                                <div className="nota-prensa-tipo-container">
                                    <div className="nota-prensa-tipo">
                                        <img src={tipo == 1 ? tipo1icon : tipo == 2 ? tipo2icon : tipo3icon} alt="Tipo" />
                                    </div>
                                </div>

                                <div className="nota-prensa-date-container">
                                    <div className="nota-prensa-date">
                                        <div className="nota-prensa-date-dia">{ new Date(post.date).getDate() }</div>
                                        <div className="nota-prensa-date-mes">{ months[new Date(post.date).getMonth()] }</div>
                                    </div>
                                </div>
                            </div>
                            <div className='nota-prensa-content'>
                                <h2>{ post.title.rendered }</h2>
                                <p>{ post.excerpt.rendered.replace(/<[^>]*>/g, '') }</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );

}

export default UltimosPosts;