---
title: Coherence-induced DT Transition
tags:
  - Deep-Thermalization
  - Coherence
  - Projected-Ensemble
  - Computational-Basis-Ensemble
  - Haar-Ensemble
  - Minimal-M
date: 2026-01-15
---
# RPD 模型：相干性诱导的深层热化 (Note 2026-01-03)

> [!info] 核心思想 (Remark)
> 在这个模型中，**测量对状态的作用本质上是“资源加法”**。这是在“数branch个数”模型中适用的intuition，但似乎未必能严格地Generalized。
---

## 1. 系统参数与测量基底 (Measurement Basis)
全局输入态：$|\Psi_0\rangle = |+\rangle^{\otimes \alpha_0 N} \otimes |0\rangle^{\otimes (1-\alpha_0) N}$

动力学：Random Permutation Dynamics，Coherence-Free

系统 B 的测量环境由两类基底组成：
- **Z basis**: 占比 $(1 - \alpha_m) N_B$ —— **基底揭示型** (Basis-revealing)，提供硬约束。
- **X basis**: 占比 $\alpha_m N_B$ —— **相干保留型** (Non-revealing)，允许路径干涉。

---

## 2. 分支计数逻辑 (Counting the Number of Branches)
通过计算全局态（Global State）投影后在子系统 A 上剩余的非零项数 $l_A$：

### A. 初始资源
- 全局态提供的初始分支数：$|S| = 2^{\alpha_0 N}$

### B. 测量筛选 (Kronecker Delta 作用)
每个 Z-basis 测量相当于一个 $1/2$ 的过滤器。经过 $(1 - \alpha_m) N_B$ 次筛选后，剩余项数 $l_A$ 满足：

$$l_A \sim 2^{\alpha_0 N} \cdot 2^{-(1 - \alpha_m) N_B} = 2^{\alpha_0 N_A + (\alpha_0 + \alpha_m - 1) N_B}$$

> [!important] 相变临界点
> 当 **$\alpha_0 + \alpha_m = 1$** 时，指数正负发生翻转，划定了两个截然不同的物理相：
> 1. **$\alpha_0 + \alpha_m < 1 \implies l_A \sim 1$**: 经典比特串系综 ($\mathcal{E}_{Cl}$)。
> 2. **$\alpha_0 + \alpha_m > 1 \implies l_A \to \infty$**: Haar 随机系综 ($\mathcal{E}_{Haar}$)。

---

## 3. 观测算符：IPR 与 Coherence
- **Coherence ($C_r$)**: 在不同基底（Basis）下表现不同，是相变的序参量。
- **IPR (Inverse Participation Ratio)**:
    - **Computational Basis**: IPR 显著较大（接近 1），反映态的局域化。
    - **Haar Ensemble**: IPR 极小（$O(1/d_A)$），反映态的全局弥散。
    - *所以 IPR 也是观测相变最直观的物理量。*

---

## 4. 总结推导 (Key Mapping)
将混合基模型映射到倾斜基模型：
$$H_2(\cos^2 \frac{\theta_0}{2}) + H_2(\cos^2 \frac{\theta_m}{2}) = \ln 2$$
这完美验证了笔记中提到的：**相干性在不同基底下不同，但其总量守恒并决定相变边界。**

（注意：对同一个态而言， Coherence 在不同的基底下的值不同）

