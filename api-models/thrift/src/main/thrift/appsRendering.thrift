include "content/v1.thrift"

namespace scala com.gu.mobile.ar.models
namespace typescript _at_guardian.apps_rendering_api_models

enum RelatedItemType {
    ARTICLE,
    FEATURE,
    ANALYSIS,
    GALLERY,
    SPECIAL,
    AUDIO,
    LIVE,
    VIDEO,
    REVIEW,
    ADVERTISEMENT_FEATURE,
    COMMENT
}

struct Image {
    1: required string url
    2: required i32 height
    3: required i32 width
    4: optional string altText
}

struct RelatedItem {
    1: required string title
    2: optional v1.CapiDateTime lastModified
    3: optional Image headerImage
    4: required string link
    5: required RelatedItemType type
    6: required v1.Pillar pillar
    7: optional string mediaDuration
    8: optional string starRating
    9: optional string byline
    10: optional string bylineImage
}

struct RelatedContent {
    1: required string title
    2: required list<RelatedItem> relatedItems
}

struct Branding {
    1: required string brandingType
    2: required string sponsorName
    3: required string logo
    4: required string sponsorUri
    5: required string label
    6: optional string altLogo
    7: required string aboutUri
}

struct FormOption {
    1: required string label
    2: required string value
}

struct FormField {
    1: required string id
    2: required string label
    3: required string name
    4: optional string description
    5: required string type
    6: required bool mandatory
    7: required list<FormOption> options
}

struct Fields {
    1: required string callout
    2: required i32 formId
    3: required string tagName
    4: optional string description
    5: required list<FormField> formFields
    6: optional string formUrl
}

struct Campaign {
    1: required string id
    2: required string name
    3: required i32 priority
    4: optional i64 activeFrom
    5: optional i64 activeUntil
    6: required bool displayOnSensitive
    7: required Fields fields
}

struct Scorer {
    1: string player
    2: i32 timeInMinutes
}

struct FollowUp {
    1: string type
    2: string uri
}

struct FootballTeam {
    1: string id
    2: string name
    3: string shortCode
    4: string crestUri
    5: i32 score
    6: list<Scorer> scorers
    7: FollowUp FollowUp
}

struct FootballContent {
    1: required string id
    2: required string status
    3: optional string phase,
    4: required string kickOff,
    5: required string competitionDisplayName,
    6: required FootballTeam homeTeam
    7: required FootballTeam awayTeam
    8: required string matchInfoUri
    9: optional string venue
    10: optional string comments
}

struct RenderingRequest {
    1: required v1.Content content
    2: optional i32 commentCount 
    3: optional bool specialReport
    4: optional map<string,string> targetingParams
    5: optional Branding branding
    6: optional list<Campaign> campaigns
    7: optional RelatedContent relatedContent
    8: optional FootballContent footbalContent
}
