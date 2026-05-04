import connectDB from '@/lib/db'
import Post from '@/models/Post'
import SEOConfig from '@/models/SEOConfig'
import InternalLinkMapping from '@/models/InternalLinkMapping'
import { generateInternalLinks, generateSEOFromContent } from '@/lib/internal-linking'

/**
 * Regenerate internal links for all blogs based on current mappings and config
 */
export async function processAllBlogs() {
    await connectDB()

    console.log('Starting blog reprocessing...')

    // 1. Get Global Config
    let config: any = await SEOConfig.findOne().sort({ createdAt: -1 })
    if (!config) {
        // Default config if missing
        config = {
            globalAutoInternalLinks: true,
            maxInternalLinksPerPost: 5
        }
    }

    const globalAutoLinks = config ? config.globalAutoInternalLinks : true
    const maxLinks = config ? (config.maxInternalLinksPerPost || 5) : 5

    // 2. Get Active Mappings
    // sort by priority desc
    const linkMappings = await InternalLinkMapping.find({ isActive: true }).sort({ priority: -1 }).lean()

    // 3. Get All Blogs
    const posts = await Post.find({})
    console.log(`Found ${posts.length} posts to check.`)

    // 4. Process each
    let updatedCount = 0

    for (const post of posts) {
        // Logic:
        // If post.autoInternalLinks is explicitly FALSE, do not auto link.
        // If post.autoInternalLinks is TRUE or UNDEFINED, check global setting.
        // Actually, usually local override global. 
        // Let's assume: if post.autoInternalLinks is defined, use it. Else use global.

        let useAuto = globalAutoLinks
        if (typeof post.autoInternalLinks === 'boolean') {
            useAuto = post.autoInternalLinks
        }

        // Even if useAuto is false, we might still have manual links to process? 
        // The generateInternalLinks function handles manual links separately from auto links.
        // But if useAuto is false, we pass useAutoLinks=false to generator.

        // Also, we must always re-process from RAW content to clear old links if settings changed.
        // So we always run generateInternalLinks, but maybe with empty mappings if disabled.

        const result = generateInternalLinks({
            content: post.content || '', // Using raw content
            autoLinks: linkMappings,
            manualLinks: post.manualLinks || [],
            useAutoLinks: useAuto,
            maxLinksPerPost: maxLinks
        })

        // Generate SEO if autoSEO is enabled
        let seoData = {
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            metaKeywords: post.metaKeywords
        }

        if (post.autoSEO !== false) {
            const generatedSEO = generateSEOFromContent(post.content || '', post.title)
            seoData = {
                metaTitle: post.metaTitle || generatedSEO.metaTitle,
                metaDescription: post.metaDescription || generatedSEO.metaDescription,
                metaKeywords: post.metaKeywords || generatedSEO.metaKeywords
            }
        }

        // Only update database if changed
        const contentChanged = post.processedContent !== result.processedContent
        const seoChanged = 
            post.metaTitle !== seoData.metaTitle ||
            post.metaDescription !== seoData.metaDescription ||
            JSON.stringify(post.metaKeywords) !== JSON.stringify(seoData.metaKeywords)

        if (contentChanged || seoChanged) {
            post.processedContent = result.processedContent
            post.internalLinksApplied = result.linksApplied
            post.metaTitle = seoData.metaTitle
            post.metaDescription = seoData.metaDescription
            post.metaKeywords = seoData.metaKeywords
            await post.save()
            updatedCount++
        }
    }

    console.log(`Reprocessed ${updatedCount} posts.`)
    return updatedCount
}

/**
 * Process a single blog post
 */
export async function processSingleBlog(postId: string) {
    await connectDB()

    const post = await Post.findById(postId)
    if (!post) {
        throw new Error('Post not found')
    }

    // Get config
    let config: any = await SEOConfig.findOne().sort({ createdAt: -1 })
    if (!config) {
        config = {
            globalAutoInternalLinks: true,
            maxInternalLinksPerPost: 5
        }
    }

    const globalAutoLinks = config ? config.globalAutoInternalLinks : true
    const maxLinks = config ? (config.maxInternalLinksPerPost || 5) : 5

    // Get mappings
    const linkMappings = await InternalLinkMapping.find({ isActive: true }).sort({ priority: -1 }).lean()

    // Determine if auto links should be used
    let useAuto = globalAutoLinks
    if (typeof post.autoInternalLinks === 'boolean') {
        useAuto = post.autoInternalLinks
    }

    // Process internal links
    const result = generateInternalLinks({
        content: post.content || '',
        autoLinks: linkMappings,
        manualLinks: post.manualLinks || [],
        useAutoLinks: useAuto,
        maxLinksPerPost: maxLinks
    })

    // Generate SEO
    let seoData = {
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        metaKeywords: post.metaKeywords
    }

    if (post.autoSEO !== false) {
        const generatedSEO = generateSEOFromContent(post.content || '', post.title)
        seoData = {
            metaTitle: post.metaTitle || generatedSEO.metaTitle,
            metaDescription: post.metaDescription || generatedSEO.metaDescription,
            metaKeywords: post.metaKeywords || generatedSEO.metaKeywords
        }
    }

    // Update post
    post.processedContent = result.processedContent
    post.internalLinksApplied = result.linksApplied
    post.metaTitle = seoData.metaTitle
    post.metaDescription = seoData.metaDescription
    post.metaKeywords = seoData.metaKeywords

    await post.save()

    return {
        processedContent: result.processedContent,
        linksApplied: result.linksApplied,
        seoData
    }
}
