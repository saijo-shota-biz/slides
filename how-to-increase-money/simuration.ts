// =======================================================
// 定数
// =======================================================
/** 1年あたりの月数 */
const MONTHS_PER_YEAR = 12 // ヶ月
/** 全世界株式インデックスファンドの年利回り (%) */
const WORLD_INDEX_ANNUAL_INTEREST_RATE = 9.52
/** 個人向け国債の年利回り (%) */
const GOVERNMENT_BOND_ANNUAL_INTEREST_RATE = 0.5
// =======================================================

// =======================================================
// 変数
// =======================================================
/** 投資期間 (年) */
const INVESTMENT_PERIOD = 30
/** 手取り月収 (円) */
const MONTHLY_INCOME = 500000
/** 月の生活費 (円) */
const MONTHLY_LIVING_COST = 400000
/** 先取り貯金の割合 (%) */
const SAVINGS_RATE = 10
/** リスク許容度 (全世界株式インデックスファンドの比率 %) */
const RISK_TOLERANCE = 100 // %
/** 貯蓄用口座が生活費の何ヶ月分を超えたら投資に回すか (ヶ月) */
const SAVINGS_MONTHS = 12 // ヶ月
/** 現在の年齢 (歳) */
const CURRENT_AGE = 30 // 歳
// =======================================================

// =======================================================
// 計算処理
// =======================================================
/** 貯蓄用の口座 */ 
let savingsAccount = 0
/** 全世界株式インデックスファンドの投資額 */
let worldIndexInvestment = 0
/** 個人向け国債の投資額 */
let governmentBondInvestment = 0

/** 毎月の貯蓄額 */
const monthlySavings = Math.floor(MONTHLY_INCOME * (SAVINGS_RATE / 100))

for (let i = 0; i < INVESTMENT_PERIOD * MONTHS_PER_YEAR; i++) {
    // 毎月の処理
    // 貯蓄用の口座にあるお金が生活費の6ヶ月分を超えていない場合
    if (savingsAccount < MONTHLY_LIVING_COST * SAVINGS_MONTHS) {
        // 貯蓄用の口座にお金を追加
        savingsAccount += monthlySavings
    } else {
        // 投資用の口座にお金を追加
        worldIndexInvestment += Math.floor(monthlySavings * (RISK_TOLERANCE / 100))
        governmentBondInvestment += Math.floor(monthlySavings * ((100 - RISK_TOLERANCE) / 100))
    }

    // 1年ごとの処理
    if (i % MONTHS_PER_YEAR === 11) {
        // 全世界株式インデックスファンドの年利回り分を増やす
        worldIndexInvestment += Math.floor(worldIndexInvestment * (WORLD_INDEX_ANNUAL_INTEREST_RATE / 100))
        // 個人向け国債の年利回り分を増やす
        governmentBondInvestment += Math.floor(governmentBondInvestment * (GOVERNMENT_BOND_ANNUAL_INTEREST_RATE / 100))
    }

    // 5年ごとに年度の終わりごとにログを出力
    if (i % MONTHS_PER_YEAR === 11 && Math.floor(i / MONTHS_PER_YEAR) % 5 === 4) {
        const age = CURRENT_AGE + Math.floor(i / MONTHS_PER_YEAR)
        const totalAssets = savingsAccount + worldIndexInvestment + governmentBondInvestment
        const totalSavings = (i + 1) * monthlySavings
        console.log(
            `${Math.floor(i / MONTHS_PER_YEAR) + 1}年目の資産状況:\n` +
            `貯蓄用の口座: ${savingsAccount.toLocaleString()}円\n` +
            `全世界株式インデックスファンドの投資額: ${worldIndexInvestment.toLocaleString()}円\n` +
            `個人向け国債の投資額: ${governmentBondInvestment.toLocaleString()}円\n` +
            `${age}歳の時の資産合計: ${totalAssets.toLocaleString()}円(貯金だけの場合${totalSavings.toLocaleString()}円)`
        );
    }
}